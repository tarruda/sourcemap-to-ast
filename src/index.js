var SourceMapConsumer = require('source-map').SourceMapConsumer;
var traverse = require('estraverse').traverse;

module.exports = function sourceMapToAst(ast, map) {
  map = new SourceMapConsumer(typeof map === 'string' ? JSON.parse(map) : map);

  traverse(ast, {
    enter: function(node) {
      if (!node.loc) return;

      var origStart = map.originalPositionFor(node.loc.start);

      if (!origStart.line) {
        delete node.loc;
        return;
      }

      node.loc = {
        start: {
          line: origStart.line,
          column: origStart.column
        },
        source: origStart.source
      };
    }
  });

  return ast;
};
