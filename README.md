Efficient JavaScript development in a Java world
================================================

Node.js is not always a possibility. This is a JavaScript setup that
works in an all-Java environment, and it shows that good JavaScript
toolchains are possible even without Node.js.

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

Tests
-----

When developing the best way to run the tests is with:

    mvn jasmine:bdd

The tests are also run during the build, just try it with:

    mvn clean test

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

The minified JavaScript code is put in the `build` folder in the target.
To ensure that everything is working, open the `index.html` in the
`build` folder in the browser. We only need to include `app.js` when the
code is minified, i.e.

```html
<script type="text/javascript" src="app.js"></script>
```

Index file and cache busting
----------------------------

This setup has a very simplified handling of the index file. It's
basically just serves the JavaScript non-minified using Require.js when
the system property `env` is set to `development`, e.g. to see it up and
running:

    $ mvn jetty:run -Denv=development

Otherwise it serves the minified JavaScript file, which includes
timestamp for cache busting, which is put in when the file is packaged
into a war, e.g. to see it up and running:

    $ mvn jetty:run-war

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

Backbone
--------

This setup contains an example of an initial setup of a Backbone.js
application, which solves some of the regular Backbone.js troubles
people run into. It should be quite simple to remove Backbone, but keep
the rest of the setup.

### Memory leaks

Most Backbone.js applications have memory leaks because of events. If
you have code like this you might have problems:

```javascript
var UserView = Backbone.View.extend({
    initialize: function() {
        this.model.on("change", this.render, this);
    },
    render: function() {
        // ...
    }
})
```

When you show and then remove this view from the DOM, it's easy to
forget to remove the bound events on the model. And if you forget to do
that it's quite likely that your views won't be garbage collected, which
leads to memory leaks.

You find a potential solution in
[eventBinder.js](https://github.com/kjbekkelund/js-java-setup/blob/master/src/main/webapp/js/component/eventBinder.js),
which is used by
`destroy` in
[view.js](https://github.com/kjbekkelund/js-java-setup/blob/master/src/main/webapp/js/base/view.js).

Now, instead of using `on`, you would use `bindTo`:

```javascript
var UserView = Backbone.View.extend({
    initialize: function() {
        this.bindTo(model, "change", this.render, this);
    },
    render: function() {
        // ...
    }
})
```

When calling `destroy` on the view, the event is automatically removed.

It is also important to recursively destroy subviews. This is
automatically done by `destroy` when `addSubView` is used on these
subviews, e.g.

```javascript
renderUserDetails: function() {
  var userDetailView = new UserDetailView({ el: el });
  this.addSubView(userDetailView);
  userDetailView.render();            
}
```

### Templates for views

There are many ways to solve views in Backbone. As already explained, we
use Hogan.js with a Require.js plugin, which enable us to add templates
as follows:

```javascript
define(['base/view', 'hgn!modules/user/user'], function(View, userTemplate) {

    var UserView = View.extend({

        template: userTemplate,

        render: function() {
            this.renderTemplate();
        }

    });

    return UserView;

});
```

You'll find `renderTemplate` in
[view.js](https://github.com/kjbekkelund/js-java-setup/blob/master/src/main/webapp/js/base/view.js).

JSHint
------

The JSHint config can be found in
[jshint-options.js](https://github.com/kjbekkelund/js-java-setup/blob/master/src/main/config/jshint-options.js).
You can find all the potential options in the
[JSHint docs](http://www.jshint.com/docs/). The settings default to
breaking the build on any JSHint errors. If you want to be more lenient,
you can choose how many errors to allow via the `JSHINT_MERCY` value.
                                         
Created by
----------

This toolchain has been set up by [@kjbekkelund](http://kimjoar.net) and
[@hinderberg](http://hinderberg.no/). However, we owe an enourmous
amount of gratitude for the amazing work of the developers of the code
used in this toolchain. You make the Java world far more bearable.

Unless otherwise noted, the code in this repo is in the
[public domain](https://github.com/kjbekkelund/js-java-setup/blob/master/UNLICENSE).
