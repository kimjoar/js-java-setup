define(['base/view', 'sinon', 'component/eventBus', 'jquery'], function(View, sinon, events, $) {

    describe('View', function() {

        describe('render template', function() {

            var testView, template;

            beforeEach(function() {
                template = sinon.mock();

                var TestView = View.extend({
                    template: template
                });

                testView = new TestView();
            });

            it('accepts a template specified as a function', function() {
                template.returns('<h1>TestView</h1>');

                testView.renderTemplate();

                expect(testView.$('h1').text()).toEqual('TestView');
            });

            it('passes input to the template function', function() {
                var data = { key: "value" };

                testView.renderTemplate(data);

                expect(testView.template).toHaveBeenCalledWith(data);
            });

            it('combines several input arguments', function() {
                testView.renderTemplate({ key: "value" }, { key2: "value2" });

                var call = testView.template.firstCall;

                var args = call.args;

                expect(args.length).toEqual(1);
                expect(args[0].key).toEqual("value");
                expect(args[0].key2).toEqual("value2");
            });

        });

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
