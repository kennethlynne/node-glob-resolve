var glob = require('glob'),
  path = require('path');
// Takes a single glob, or an array of globs and returns the paths to the resolved files
module.exports = function (patterns, cwd) {
  if (!cwd) {
    cwd = process.cwd();
  }
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }
  return patterns
    .map(function (pattern) {
      return glob.sync(pattern);
    })
    .reduce(function (val, list) {
      list.forEach(function (file) {
        var filePath = path.relative(cwd, file);
        if (val.indexOf(filePath) < 0) {
          val.push(filePath);
        }
      });
      return val;
    }, []);
};
