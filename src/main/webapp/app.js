define(['underscore', 'backbone', 'router', 'section', 'jquery'], function(_, Backbone, Router, Section, $) {

  var App = function($el) {
    this.$el = $el;
  };

  _.extend(App.prototype, {
    addSections: function(sections) {
      this.sections = this.sections || {};

      _.each(sections, function(selector, name) {
        this.sections[name] = new Section(this.$el, selector);
      }, this);
    },

    run: function() {
      var router = new Router(this.sections);

      $(function() {
        Backbone.history.start();
      });
    }
  });

  return App;

});
