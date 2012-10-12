define(['underscore', 'backbone'], function(_, Backbone) {

  var EventBinder = function() {
    this.eventBindings = [];
  };

  _.extend(EventBinder.prototype, {
    bindTo: function (obj, eventName, callback, context) {
      context = context || this;
      obj.on(eventName, callback, context);

      this.eventBindings.push({
        obj: obj,
        eventName: eventName,
        callback: callback,
        context: context
      });
    },

    // Unbind from a single binding object.
    unbindFrom: function(binding){
      binding.obj.off(binding.eventName, binding.callback, binding.context);

      this.eventBindings = _.reject(this.eventBindings, function(bind) {
        return bind === binding;
      });
    },

    // Unbind all the stored events.
    unbindAll: function () {
      var bindings = _.map(this.eventBindings, _.identity);
      var unbind = _.bind(this.unbindFrom, this);

      _.each(bindings, unbind);
    }
  });

  // Copy the `extend` function used by Backbone's classes
  EventBinder.extend = Backbone.View.extend;

  return EventBinder;

});
