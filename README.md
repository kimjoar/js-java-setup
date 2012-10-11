My Require.js setup
===================

This is a sample setup of a Java project using
[Require.js](http://requirejs.org/).

Minify
------

The code is minified by using the
[requirejs-maven-plugin](https://github.com/mcheely/requirejs-maven-plugin)
to call [r.js](https://github.com/jrburke/r.js) with the build config
specified in [buildconfig.js]().

The minified code uses [Almond](https://github.com/jrburke/almond)
instead of Require.js, as a full AMD loader is not needed for the
minified code. Almond is also created by [James
Burke](https://github.com/jrburke), the creator of Require.js, and is a
minimal AMD API implementation with a minified and gzipped size of about
1 kilobyte,

### Minify with Node.js

This setup can also be minified using Node.js:

```bash
node src/main/scripts/r.js -o src/main/config/buildconfig.js optimize=uglify
```
