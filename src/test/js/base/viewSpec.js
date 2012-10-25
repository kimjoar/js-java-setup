define(['base/view', 'sinon', 'component/eventBus', 'jquery'], function(View, sinon, events, $) {

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

            it('unbinds delegated events', function() {
                var spy = sinon.spy();

                var TestView = View.extend({
                    events: {
                        'click': spy
                    }
                });

                var testView = new TestView();
                testView.destroy();

                testView.$el.click();

                expect(spy).not.toHaveBeenCalled();
            });

            it('removes the view from the DOM', function() {
                var DOM = $('<div></div>');

                var TestView = View.extend({
                    className: 'someClass',
                    tagName: 'h1'
                });

                var testView = new TestView();

                DOM.append(testView.el);

                expect(DOM.html()).toEqual('<h1 class="someClass"></h1>');

                testView.destroy();

                expect(DOM.html()).toEqual('');
            });

        });

    });

});
