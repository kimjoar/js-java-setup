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
            var user = new User({ name: "Testing", age: 26 });
            var userView = new UserView({ user: user });

            this.sections.main.show(userView);
            userView.render();
        }
    });

    return Router;

});
