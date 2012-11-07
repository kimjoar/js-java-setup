define([
   'underscore',
   'router',
   'section',
   'jquery',
   'base/view',
   'hgn!modules/app/app'
], function(_, Router, Section, $, View, appTemplate) {

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

            var router = new Router(this.sections);

            done();
        }
    });

    return App;

});
