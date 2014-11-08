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
      var result, negated = pattern.substr(0, 1) === '!';

      new Glob(negated ? pattern.substr(1) : pattern, options, function (err, matches) {
        result = matches;
      });

      return {
        matches: result,
        negated: negated
      };
    })
    .reduce(function (val, result) {

      result.matches.forEach(function (match) {
        var index = val.indexOf(match);

        if (result.negated) {
          val.splice(index, 1);
        }
        else {
          if (index < 0) {
            val.push(match);
          }
        }

      });

      return val;
    }, []);
};
