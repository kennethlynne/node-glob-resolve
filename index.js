var Glob = require('glob').Glob;

// Takes a single glob, or an array of globs and returns the paths to the resolved files in order of the matching glob synchronously

module.exports = function (patterns, options) {
  if (!patterns) {
    return [];
  }
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }

  options = (options || {});
  options.sync = true;

  return patterns
    .map(function (pattern) {
      var result;

      new Glob(pattern, options, function (err, matches) {
        result = matches;
      });

      return result;
    })
    .reduce(function (val, matches) {
      matches.forEach(function (match) {
        if (val.indexOf(match) < 0) {
          val.push(match);
        }
      });
      return val;
    }, []);
};
