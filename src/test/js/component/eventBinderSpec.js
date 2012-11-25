define(['component/eventBinder', 'sinon'], function(EventBinder, sinon) {

    describe('eventBinder', function() {

        var eventBinder;
        var object = {
            on: function() {},
            off: function() {}
        };

        beforeEach(function() {
            eventBinder = new EventBinder();
        });

        describe("bindTo", function() {
            it("adds binding to event binding list", function() {
                eventBinder.bindTo(object, "some event", function() {}, this);
                expect(eventBinder.eventBindings.length).toBe(1);
            });

            it("returns binding", function() {
                var binding = eventBinder.bindTo(object, "some event", function() {}, this);
                expect(binding).toBeDefined();
            });
        });

        describe("unbindFrom", function() {
            it("unbinds returned binding", function() {
                var binding = eventBinder.bindTo(object, "some event", function() {}, this);
                expect(eventBinder.eventBindings.length).toBe(1);
                eventBinder.unbindFrom(binding);
                expect(eventBinder.eventBindings.length).toBe(0);
            });
        });

        describe("unbindAll", function() {
            it("unbinds all bindings", function() {
                eventBinder.bindTo(object, "some event", function() {}, this);
                eventBinder.bindTo(object, "some other event", function() {}, this);
                eventBinder.bindTo(object, "some other than the other event", function() {}, this);
                eventBinder.bindTo(object, "some other than the other than the other event", function() {}, this);

                 expect(eventBinder.eventBindings.length).toBe(4);
                eventBinder.unbindAll();
                expect(eventBinder.eventBindings.length).toBe(0);
            });
        });

    });

});
