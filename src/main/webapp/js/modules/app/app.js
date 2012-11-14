define([
   'underscore',
   'router',
   'jquery',
   'base/view',
   'component/section',
   'hgn!modules/app/app'
], function(_, Router, $, View, Section, appTemplate) {

    var App = View.extend({

        template: appTemplate,

        addSections: function(sections) {
            this.sections = this.sections || {};

            _.each(sections, function(selector, name) {
                this.sections[name] = new Section(this.$el, selector);
            }, this);
        },

        run: function(done) {
            this.renderTemplate();

            this.router = new Router(this.sections);

            done();
        }
    });

    return App;

});
