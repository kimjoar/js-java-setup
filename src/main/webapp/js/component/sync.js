define(['backbone', 'underscore'], function(Backbone, _) {

    var baseUrl = '/rest';

    var urlError = function() {
        throw new Error('A "url" property or function must be specified');
    };

    return function(method, model, options) {
        options = options || {};

        var url = options.url || _.result(model, 'url') || urlError();
        options.url = baseUrl + url;

        Backbone.sync.apply(this, arguments);
    };

});
