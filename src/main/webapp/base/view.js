define([
    'jquery',
    'backbone',
    'underscore',
    'component/eventBinder',
    'component/subViewHandler'
],
    function($, Backbone, _, EventBinder, SubViewHandler) {

        var View = Backbone.View.extend({

            constructor: function() {
                var eventBinder = new EventBinder();
                _.extend(this, eventBinder);

                var subViewHandler = new SubViewHandler();
                _.extend(this, subViewHandler);

                Backbone.View.prototype.constructor.apply(this, arguments);
            },

            destroy: function() {
                // Unbind all events bound in the view, i.e. those bound
                // with `this.bindTo`
                this.unbindAll();

                // Unbind all events that are bound to the view, i.e.
                // those bound with `this.on`
                this.off();

                // Remove the view from the DOM
                this.remove();

                // Recusively destroy all subviews
                this.destroySubViews();
            },

            renderTemplate: function(data) {
                if (!_.isFunction(this.template)) {
                    return;
                }
                var html = this.template(data || {});
                this.$el.html(html);
            }

        });

        return View;

    });
