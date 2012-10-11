define(['backbone', 'modules/user/userView'], function(Backbone, UserView) {

  var Router = Backbone.Router.extend({

    initialize: function(sections) {
      this.sections = sections;
    },

    routes: {
      '': 'showUser'
    },

    showUser: function() {
      var userView = new UserView();
      userView.render();

      this.sections.main.show(userView);
    }
  });

  return Router;

});
