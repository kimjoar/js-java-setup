define(['underscore', 'backbone'], function(_, Backbone) {

  var events = _.clone(Backbone.Events);

  var eventProxy = function(name) {
    return function() {
      events[name].apply(events, arguments);
    }
  }

  return {
    on: eventProxy("on"),
    off: eventProxy("off"),
    trigger: eventProxy("trigger"),
    reset: function() {
      events.off();
    }
  }

});
