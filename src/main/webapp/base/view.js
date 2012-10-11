define([
    'jquery',
    'backbone',
    'underscore',
    'component/eventBinder'
  ],
  function($, Backbone, _, EventBinder) {

  var View = Backbone.View.extend({

    constructor: function() {
      var eventBinder = new EventBinder();
      _.extend(this, eventBinder);

      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    destroy: function() {
      this.unbindAll();
      this.remove();
    },

    renderTemplate: function(data) {
      if (!_.isFunction(this.template)) return;
      var html = this.template(data);
      this.$el.html(html);
    }

  });

  return View;

});
