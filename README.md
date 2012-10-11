Example JavaScript setup for Java projects
==========================================

This is a sample setup of a Java project using
[Require.js](http://requirejs.org/) and
[Backbone.js](http://backbonejs.org).

Minify
------

The code is minified by using the
[requirejs-maven-plugin](https://github.com/mcheely/requirejs-maven-plugin)
to call [r.js](https://github.com/jrburke/r.js) with the build config
specified in
[buildconfig.js](https://github.com/kjbekkelund/requirejs-java/blob/master/src/main/config/buildconfig.js).

The minified code uses [Almond](https://github.com/jrburke/almond)
instead of Require.js, as a full AMD loader is not needed for the
minified code. Almond is also created by [James
Burke](https://github.com/jrburke), the creator of Require.js, and is a
minimal AMD API implementation with a minified and gzipped size of about
1 kilobyte.

The minified JavaScript code is put in `src/main/webapp/build/app.js`.
To ensure that everything is working, open
`src/main/webapp/build/index.html` in the browser. We only need to
include `app.js` when the code is minified, i.e.

```html
<script type="text/javascript" src="app.js"></script>
```

### Minify with Node.js

This setup can also be minified using Node.js:

```
node src/main/scripts/r.js -o src/main/config/buildconfig.js optimize=uglify
```

(Better for debugging, as it usually yields far better error messages
than those produced when Java is used to minify the code.)
