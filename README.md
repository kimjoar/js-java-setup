Efficient JavaScript development in a Java world
================================================

Node.js is not always a possibility. This is a JavaScript setup that
works in an all-Java environment, and it shows that good JavaScript
toolchains are possible even without Node.js.

We have used a setup similar to this in several large-scale JavaScript
applications for some of the largest companies in Norway.

Hopefully this will make your JavaScript development a whole lot easier
when there's only Java all around.

The Toolchain
-------------

This is an opinionated sample setup of a Java project which uses:

* [Require.js](http://requirejs.org/) for loading modules
* [r.js](http://requirejs.org/docs/optimization.html) for minified
  JavaScript in production
* [Backbone.js](http://backbonejs.org) for models, views and routers
* [Hogan.js](http://twitter.github.com/hogan.js/) for
  [Mustache](http://mustache.github.com/) templates that can be
  precompiled to JavaScript in production
* [Jasmine](http://pivotal.github.com/jasmine/) for tests
* [Sinon](http://sinonjs.org) for test spies, stubs and mocks
* [Saga](http://timurstrekalov.github.com/saga/) for code coverage
* [JSHint](http://www.jshint.com/) to detect problems and errors in the
  JavaScript code

Templates
---------

To easily include templates we use a
[Require.js Hogan plugin](https://github.com/millermedeiros/requirejs-hogan-plugin). 

Lets say we create the following Mustache file, `foo.mustache`:

```mustache
<div class="foo">
    <h1>{{title}}</h1>
    <ul>
        {{#names}}
        <li>{{.}}</li>
        {{/names}}
    </ul>
</div>
```

We can then load it using the `hgn` command:

```javascript
// this will load the "foo.mustache" file
require(['hgn!foo'], function(foo) {
    // the plugin returns the `render()` method of the `Hogan.Template`

    var markup = foo({
        title : 'Hello!',
        names : ['world', 'foo bar', 'lorem ipsum']
    });

    console.log(markup);
});
```

During optimization the templates will be pre-compiled and stored as
pure JavaScript for better performance.

(If [Handlebars.js](http://handlebarsjs.com/) is your cup of tea, it
should be
[quite easy](https://github.com/SlexAxton/require-handlebars-plugin)
to include instead of Hogan.js.)

Test Coverage
-------------

Test coverage is useful for finding untested parts of a codebase. We
have included [Saga](http://timurstrekalov.github.com/saga/), which is a
great Java-based test coverage tool for JavaScript. Saga generates test
coverage reports in both HTML and LCOV format. The latter is named
`total-coverage.dat` and can be read by
[Sonar](http://www.sonarsource.org/) (the file might need to be
[renamed first](http://sonar.15.n6.nabble.com/JavaScript-Plugin-Code-Coverage-td5000746.html)).
Both files can be found in the `target/coverage` folder after a build.

Minify
------

The code is minified by using the
[requirejs-maven-plugin](https://github.com/mcheely/requirejs-maven-plugin).
The plugin uses [r.js](https://github.com/jrburke/r.js) with the 
buildconfig specified in
[buildconfig.js](https://github.com/kjbekkelund/js-java-setup/blob/master/src/main/config/buildconfig.js).

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

(This is better for debugging, as it usually yields far better error
messages than those produced when Java is used to minify the code.)

Created by
----------

This toolchain has been set up by [@kjbekkelund](http://kimjoar.net) and
[@hinderberg](http://hinderberg.no/). However, we owe an enourmous
amount of gratitude for the amazing work of the developers of the code
used in this toolchain. You make the Java world far more bearable.

Unless otherwise noted, the code in this repo is in the
[public domain](https://github.com/kjbekkelund/js-java-setup/blob/master/UNLICENSE).

TODO
====

* Creating an index.html for production which include cache busting for
  the minified JavaScript (instead of having a separate index.html in
  the build folder as we do now)
* Ensure that only the minified JS is included in production
