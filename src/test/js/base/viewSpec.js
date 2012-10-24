define(['base/view', 'sinon', 'component/eventBus'], function(View, sinon, events) {

    describe('View', function() {

        describe('destroy', function() {

            it('unbinds all events bound by the view', function() {
                var spy = sinon.spy();

                var view = new View();
                view.bindTo(events, "test", spy);
                view.destroy();

                events.trigger("test");

                expect(spy).not.toHaveBeenCalled();
            });

            it('unbinds the events bound directly on the view', function() {
                var spy = sinon.spy();

                var view = new View();
                view.on("test", spy);
                view.destroy();

                view.trigger("test");

                expect(spy).not.toHaveBeenCalled();
            });

            it('unbinds events bound on subviews', function() {
                var spy = sinon.spy();

                var TestView = View.extend({
                    initialize: function() {
                        this.bindTo(events, "test", spy);
                    }
                });

                var view = new View();
                var testView = new TestView();

                view.addSubView(testView);
                view.destroy();

                events.trigger("test");

                expect(spy).not.toHaveBeenCalled();
            });

        });

    });

});
