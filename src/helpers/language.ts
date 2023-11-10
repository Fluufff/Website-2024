import { cache } from 'react';

export const getMessages = cache(async (locale: string) => {
  const poModule = await import(
    `@atomic-reactor/webpack-po-loader!@/messages/${locale}.po`
  );
  const jedData: JedData = JSON.parse(poModule.strings);

  return processJed(jedData);
});

type JedData = Record<string, [unknown, string]>;
type TranslationTree = { [k: string]: string | TranslationTree };

function processJed(data: JedData): TranslationTree {
  const tree: TranslationTree = {};
  for (const [key, value] of Object.entries(data)) {
    insert(
      // our own separator convention
      key.split('##'),
      // the JED format output by @atomic-reactor/webpack-po-loader associates keys to [null, string]
      value[1],
      tree,
    );
  }

  return tree;
}

function insert(path: string[], value: string, tree: TranslationTree): void {
  let i = 0;
  for (i = 0; i < path.length - 1; i++) {
    const next = tree[path[i]];
    if (typeof next === 'object') {
      tree = next;
    } else {
      // possibly erase non-object child
      if (next !== undefined) {
        console.warn(
          'Processing translations: overriding existing value: ' +
            JSON.stringify({ path, value }),
        );
      }
      tree = tree[path[i]] = {};
    }
  }

  tree[path[i]] = value;
}
