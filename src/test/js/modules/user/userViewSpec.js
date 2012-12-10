define(['modules/user/userView', 'modules/user/user'], function(UserView, User) {

    describe('User view', function() {

        var userView, user, name;

        beforeEach(function() {
            name = "Test Testesen";
            user = new User();
            userView = new UserView({ user: user });
        });

        it('renders when user is updated', function() {
            user.set({ name: name });

            expect(userView.$("h1").text()).toContain(name);
        });

        it('renders user details', function() {
            user.set({ name: name });

            expect(userView.$(".user-detail").text()).toNotBe('');
        });

        it('updates user detail view element on render', function() {
            user.set({ name: name });
            userView.render();

            expect(userView.$(".user-detail").text()).toNotBe('');
        });

    });

});
