// Generated by CoffeeScript 1.10.0
(function() {
  var jsonStringify;

  jsonStringify = require('json-stable-stringify');

  module.exports = function(_process, _console, builder) {
    var argv;
    if (builder == null) {
      builder = require('.');
    }
    argv = _process.argv.slice(2);
    if (!argv.length) {
      _console.error('Path is required.');
      return _process.exit(1);
    }
    return builder.build(argv[0]).then(function(result) {
      return _console.log(jsonStringify(result, {
        space: 2
      }));
    })["catch"](function(error) {
      return _console.error(error.toString());
    });
  };

}).call(this);
