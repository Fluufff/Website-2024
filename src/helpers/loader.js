const po2json = require('po2json/index');

module.exports = function (source) {
  const flatStrings = po2json.parse(source, {
    format: 'raw',
    stringify: false,
  });

  const exported = { strings: process(flatStrings) };

  return `module.exports = ${JSON.stringify(exported)}`;
};

function process(data) {
  const tree = {};
  for (const [key, value] of Object.entries(data)) {
    insert(
      // our own separator convention
      key.split('##'),
      // the format output by @atomic-reactor/webpack-po-loader associates keys to [null, string]
      value[1],
      tree,
    );
  }

  return tree;
}

function insert(path, value, tree) {
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
