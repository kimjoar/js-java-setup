define([
    'base/view',
    'modules/user/userDetailView',
    'hgn!modules/user/user',
    'component/eventBus'
], function(View, UserDetailView, userTemplate, events) {

    var UserView = View.extend({

        template: userTemplate,

        initialize: function(options) {
            this.user = options.user;

            // don't write this
            // this.user.on("change", this.render, this);

            // write this instead (see component/eventBinder.js)
            this.bindTo(this.user, "change", this.render, this);

            // or this to bind to global events
            this.bindTo(events, "global", this.render, this);
        },

        render: function() {
            this.renderTemplate(this.user.toJSON());
            this.renderUserDetail(this.$(".user-detail"));
        },

        renderUserDetail: function(el) {
            this.userDetailView = this.userDetailView || new UserDetailView({ el: el });
            this.addSubView(this.userDetailView);
            this.userDetailView.render();
        }

    });

    return UserView;

});
