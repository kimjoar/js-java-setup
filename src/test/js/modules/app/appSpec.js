define(['modules/app/app', 'component/section'], function(App, Section) {

    describe('app', function() {

        var app, el;

        beforeEach(function() {
            el = $('<div></div>');
            app = new App({ el: el });
        });

        afterEach(function() {
            app.destroy();
        });

        describe('sections', function() {

            it('are defined', function() {
                app.addSections({
                    'content': '.content'
                });

                expect(app.sections.content).toBeDefined();
            });

            it('are instances of section', function() {
                app.addSections({
                    'content': '.content'
                });

                expect(app.sections.content instanceof Section).toBe(true);
            });

        });

        describe('run', function() {

            it('renders the app layout', function() {
                expect(app.$el.html()).toEqual('');
                app.run(function() {});
                expect(app.$el.html()).not.toEqual('');
            });

            it('triggers the done callback when the setup is finished', function() {
                var spy = sinon.spy();
                app.run(spy);
                expect(spy).toHaveBeenCalledOnce();
            });

        });

    });

});
