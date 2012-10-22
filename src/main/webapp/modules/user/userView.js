define(['base/view', 'modules/user/userDetailView', 'hgn!modules/user/user'], function(BaseView, UserDetailView, userTemplate) {

    var UserView = BaseView.extend({

        template: userTemplate,

        render: function() {
            this.renderTemplate();
            this.renderUserDetail(this.$el.find(".user-detail"));
        },

        renderUserDetail: function($el) {
            var userDetailView = this.addSubView(new UserDetailView({el: $el}));
            userDetailView.render();
        }

    });

    return UserView;

});
