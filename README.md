node-glob-resolve
=================

Takes a single glob, or an array of globs and returns the paths to the resolved files relative to a folder.
Files are only added once, and they are returned in the order of the globs.
Especially useful for using packages that does not support globs with for example gulp.

Example:
```javascript
  var globResolve = require('node-glob-resolve');
  globResolve([
    '/scripts/main.js',
    '/scripts/second/**/*.js',
    '/scripts/**/*.js'
  ], './');
  // Returns 
  //[
  //    '/scripts/main.js',
  //    '/scripts/second/a.js',
  //    '/scripts/second/b.js',
  //    '/scripts/the_rest_of_the_files.js',
  //]
```

## TODO
 * Add tests
 * Add support for async
