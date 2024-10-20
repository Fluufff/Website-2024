#!/usr/bin/env node
// @ts-check

/** @file Exports and imports messages and translations to and from CSV. */
//
// When exporting, the key order follows the English file. When importing, all
// JSONs follow the CSV file.
//
// The JSONs are expected to be formatted according to JS `JSON.stringify` with
// 2 spaces of indentation.
//
// As such, assuming all JSONs share the same set of keys, the round-trip should
// be a no-op on the English JSON file.

const fs = require('fs');
const path = require('path');
const process = require('process');

const Papa = require('papaparse');
const R = require('remeda');

const LANGS = ['en', 'fr', 'nl', 'de'];

const messagesPath = path.join(__dirname, '../src/messages');
const csvPath = path.join(messagesPath, 'messages.csv');
// JSDoc type syntax is silly... This asserts that we have a
// Record<string,string> instead of Partial<Record<string,string>>.
/** @type {{[lang: string]: string}} */
const jsonPaths =
  /** @type {{[lang: string]: any}} */
  (R.fromKeys(LANGS, (lang) => path.join(messagesPath, `${lang}.json`)));

////////////////
// utilities
////////////////

/** Recursively walk the strings in a tree of messages.
 * @param {any} tree
 * @param {(path: string[], message: string | null) => void} visitor
 * @returns {void}
 */
function walkTranslationTree(tree, visitor) {
  if (typeof tree === 'string' || tree === null) {
    visitor([], tree);
  } else {
    for (const [k, subtree] of Object.entries(tree)) {
      walkTranslationTree(subtree, (path, message) =>
        visitor([k, ...path], message),
      );
    }
  }
}

/** Sets a deep path in an object.
 * @param {any} obj
 * @param {string[]} path
 * @param {any} value
 */
function setPath(obj, path, value) {
  if (path.length === 1) {
    obj[path[0]] = value;
  } else if (path.length > 1) {
    const [k, ...rest] = path;
    setPath((obj[k] ??= {}), rest, value);
  }
}

/** Remeda isDeepEqual, but without the type guard
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
function isDeepEqual(a, b) {
  return R.isDeepEqual(a, b);
}

////////////////
// conversion
////////////////

/** Convert JSON data to CSV data.
 * @param {{[lang: string]: any}} byLang
 * @returns {Array<{[column: string]: string}>}
 */
function toCsvRows(byLang) {
  /** @type {{[key: string]: {[lang: string]: string}}} */
  const flatTranslations = {};
  for (const [lang, tree] of Object.entries(byLang)) {
    walkTranslationTree(
      tree,
      (p, msg) => ((flatTranslations[p.join('.')] ??= {})[lang] = msg),
    );
  }

  return Object.entries(flatTranslations).map(([key, translations]) => ({
    key,
    ...translations,
  }));
}

/** Convert CSV data to JSON data.
 * @param rows {Array<{[column: string]: string}>}
 * @returns {{[lang: string]: any}}
 */
function fromCsvRows(rows) {
  const byLang = R.fromKeys(LANGS, () => /** @type {any} */ ({}));
  rows.forEach(({ key, ...translations }) => {
    const path = key.split('.');
    Object.entries(translations).forEach(([lang, message]) => {
      setPath(byLang[lang], path, message || null);
    });
  });

  return byLang;
}

////////////////
// i/o
////////////////

/** Write CSV data to the filesystem.
 * @param {string} path
 * @param rows {Array<{[column: string]: string}>}
 * @returns {void}
 */
function writeCsv(path, rows) {
  const csvContents = Papa.unparse(rows, { quotes: true, newline: '\n' });
  fs.writeFileSync(path, csvContents, 'utf8');
}

/** Read CSV data from the filesystem.
 * @param {string} path
 * @returns {Array<{[column: string]: string}>}
 */
function readCsv(path) {
  const csvContents = fs.readFileSync(path, 'utf8');
  /** @type {Papa.ParseResult<{[column: string]: string}>} */
  const parsed = Papa.parse(csvContents, { header: true });

  const expectedFields = ['key', ...LANGS];
  if (!isDeepEqual(parsed.meta.fields, expectedFields)) {
    console.error(
      'Error: expected to find the following headers in the CSV file: ' +
        expectedFields.join(', ') +
        '\n' +
        'Found these instead: ' +
        parsed.meta.fields?.join(', '),
    );
    process.exit(1);
  }

  return parsed.data;
}

/** Write JSON data to the filesystem.
 * @param {{[lang: string]: string}} paths
 * @param {{[lang: string]: any}} byLang
 * @returns {void}
 */
function writeJsons(paths, byLang) {
  for (const [lang, tree] of Object.entries(byLang)) {
    fs.writeFileSync(paths[lang], JSON.stringify(tree, null, 2) + '\n');
  }
}

/** Read JSON data from the filesystem.
 * @param {{[lang: string]: string}} paths
 * @returns {{[lang: string]: any}}
 */
function readJsons(paths) {
  return R.mapValues(paths, (path) =>
    JSON.parse(fs.readFileSync(path, 'utf8')),
  );
}

////////////////
// CLI
////////////////

/** @returns {void} */
function main() {
  const args = process.argv.slice(2);

  switch (true) {
    case args[0] === 'export':
      return writeCsv(args[1] ?? csvPath, toCsvRows(readJsons(jsonPaths)));
    case args[0] === 'import':
      return writeJsons(jsonPaths, fromCsvRows(readCsv(args[1] ?? csvPath)));
  }

  console.error('This utility takes only one argument: "export" or "import"');
  process.exit(1);
}

main();
