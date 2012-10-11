define(['base/view', 'hgn!modules/user/user'], function(View, userTemplate) {

  var UserView = View.extend({

    template: userTemplate,

    render: function() {
      this.renderTemplate();
    }

  });

  return UserView;

});
