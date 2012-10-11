requirejs.config({
  paths: {
    'jquery': 'vendor/jquery',
    'underscore': 'vendor/underscore',
    'backbone': 'vendor/backbone',
    'hogan': 'vendor/hogan',
    'hgn': 'vendor/plugin/hgn',
    'text': 'vendor/plugin/text'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

define(['app', 'jquery'], function (App, $) {

  var app = new App($("body"));

  app.addSections({
    "nav": "#nav",
    "main": "#main"
  });

  app.run();

});

