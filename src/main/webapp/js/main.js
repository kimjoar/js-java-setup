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

define(['modules/app/app', 'jquery', 'backbone'], function(App, $, Backbone) {

    var app = new App({ el: $("body") });

    app.addSections({
        "nav": "#nav",
        "main": "#main"
    });

    $(document).ready(function() {
        app.run(function() {
            Backbone.history.start();
        });
    });
});

