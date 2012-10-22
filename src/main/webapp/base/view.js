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
                var subViewHandler = new SubViewHandler();
                _.extend(this, eventBinder);
                _.extend(this, subViewHandler);

                Backbone.View.prototype.constructor.apply(this, arguments);
            },

            destroy: function() {
                this.unbindAll();
                this.remove();
                this.destroyAllSubViews();
            },

            renderTemplate: function(data) {
                if (!_.isFunction(this.template)) return;
                var html = this.template(data);
                this.$el.html(html);
            }

        });

        return View;

    });
