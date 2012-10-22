Example JavaScript setup for Java projects
==========================================

This is an opinionated sample setup of a Java project which uses:

* [Require.js](http://requirejs.org/) for loading modules
* [Backbone.js](http://backbonejs.org) models, views and routers
* [Hogan.js](http://twitter.github.com/hogan.js/) for
  [Mustache](http://mustache.github.com/) templates that can be
  precompiled to JavaScript in production
* [Jasmine](http://pivotal.github.com/jasmine/) for tests
* [Sinon](http://sinonjs.org) for test spies, stubs and mocks

Modules
-------

Components
----------

Templates
---------

To easily include plugins we use a
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

Minify
------

The code is minified by using the
[requirejs-maven-plugin](https://github.com/mcheely/requirejs-maven-plugin).
The plugin uses [r.js](https://github.com/jrburke/r.js) with the 
buildconfig specified in
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

(This is better for debugging, as it usually yields far better error
messages than those produced when Java is used to minify the code.)
