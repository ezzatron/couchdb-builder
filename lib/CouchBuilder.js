// Generated by CoffeeScript 1.10.0
(function() {
  var CouchBuilder, Promise, path;

  path = require('path');

  Promise = require('bluebird');

  module.exports = CouchBuilder = (function() {
    function CouchBuilder(handlers, _readdirp) {
      this.handlers = handlers != null ? handlers : [];
      this._readdirp = _readdirp != null ? _readdirp : require('readdirp');
    }

    CouchBuilder.prototype.build = function(root) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var closeError, entries, stream;
          closeError = null;
          entries = [];
          stream = _this._readdirp({
            root: root,
            entryType: 'files'
          });
          stream.on('data', function(entry) {
            entries.push(entry);
          });
          stream.on('end', function() {
            _this._processEntries(entries).then(function(result) {
              return resolve(result);
            })["catch"](function(error) {
              return reject(error);
            });
          });
          stream.on('warn', function(error) {
            closeError = error;
            stream.destroy();
          });
          stream.on('close', function() {
            return reject(closeError);
          });
          stream.on('error', function(error) {
            return reject(error);
          });
        };
      })(this));
    };

    CouchBuilder.prototype._processEntries = function(entries) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var entry;
          entries.sort(function(left, right) {
            if (left.path < right.path) {
              return -1;
            } else {
              return 1;
            }
          });
          Promise.all((function() {
            var j, len, results1;
            results1 = [];
            for (j = 0, len = entries.length; j < len; j++) {
              entry = entries[j];
              results1.push(this._processPath(entry.fullPath));
            }
            return results1;
          }).call(_this)).then(function(results) {
            var atoms, entry, i, j, len, result;
            result = {};
            for (i = j = 0, len = entries.length; j < len; i = ++j) {
              entry = entries[i];
              if (results[i] != null) {
                atoms = entry.path.split(path.sep);
                atoms[atoms.length - 1] = results[i][0];
                _this._set(result, atoms, results[i][1]);
              }
            }
            return resolve(result);
          })["catch"](function(error) {
            return reject(error);
          });
        };
      })(this));
    };

    CouchBuilder.prototype._processPath = function(filePath) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var handler, promises;
          promises = [];
          Promise.all((function() {
            var j, len, ref, results1;
            ref = this.handlers;
            results1 = [];
            for (j = 0, len = ref.length; j < len; j++) {
              handler = ref[j];
              results1.push(handler.handleFile(filePath));
            }
            return results1;
          }).call(_this)).then(function(results) {
            var j, len, result;
            for (j = 0, len = results.length; j < len; j++) {
              result = results[j];
              if (result != null) {
                return resolve(result);
              }
            }
            return resolve(null);
          })["catch"](function(error) {
            return reject(error);
          });
        };
      })(this));
    };

    CouchBuilder.prototype._set = function(object, atoms, value) {
      var atom, atomCount;
      atomCount = atoms.length;
      atom = atoms.shift();
      if (atomCount === 1) {
        object[atom] = value;
      } else {
        if (object[atom] == null) {
          object[atom] = {};
        }
        this._set(object[atom], atoms, value);
      }
    };

    return CouchBuilder;

  })();

}).call(this);
