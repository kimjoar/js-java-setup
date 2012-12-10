define(['base/view', 'hb!modules/user/userDetail'], function(BaseView, userDetailTemplate) {

    var UserDetailView = BaseView.extend({

        template: userDetailTemplate,

        initialize: function(options) {
			this.user = options.user;
			this.bindTo(this.user, "change:age", this.render, this);
        },

        render: function() {
            this.renderTemplate(this.user.toJSON());
        }

    });

    return UserDetailView;

});
