define([
    'router',
    'modules/user/userView'
], function(Router, UserView) {

    describe('Router', function() {

        it('show user', function() {
            var spy = sinon.spy();

            var sections = {};
            sections.main = {
                show: spy
            };

            var router = new Router(sections);

            router.user();

            var args = spy.firstCall.args;

            expect(args[0] instanceof UserView);
        });

    });

});
