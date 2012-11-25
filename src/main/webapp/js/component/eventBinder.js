define(['underscore', 'backbone'], function(_, Backbone) {

    var EventBinder = function() {
        this.eventBindings = [];
    };

    _.extend(EventBinder.prototype, {

        bindTo: function(obj, eventName, callback, context) {
            context = context || this;
            obj.on(eventName, callback, context);

            var binding = {
                obj: obj,
                eventName: eventName,
                callback: callback,
                context: context
            };

            this.eventBindings.push(binding);

            return binding;
        },

        // Unbind from a single binding object.
        unbindFrom: function(binding) {
            binding.obj.off(binding.eventName, binding.callback, binding.context);

            this.eventBindings = _.reject(this.eventBindings, function(bind) {
                return bind === binding;
            });
        },

        // Unbind all the stored events.
        unbindAll: function() {
            var bindings = _.map(this.eventBindings, _.identity);
            var unbind = _.bind(this.unbindFrom, this);

            _.each(bindings, unbind);
        }
    });

    return EventBinder;

});
