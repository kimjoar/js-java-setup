define(['base/view', 'hb!modules/user/userDetail'], function(BaseView, userDetailTemplate) {

    var UserDetailView = BaseView.extend({

        template: userDetailTemplate,

        render: function() {
            this.renderTemplate();

            return this;
        }

    });

    return UserDetailView;

});
