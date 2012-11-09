define([
    'backbone',
    'modules/user/userView',
    'modules/user/user'
], function(Backbone, UserView, User) {

    var Router = Backbone.Router.extend({

        initialize: function(sections) {
            this.sections = sections;
        },

        routes: {
            '': 'user'
        },

        user: function() {
            var user = new User();
            var userView = new UserView({ user: user });
            userView.render();

            this.sections.main.show(userView);
        }
    });

    return Router;

});
