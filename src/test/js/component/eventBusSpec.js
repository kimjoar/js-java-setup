define(['component/eventBus', 'sinon'], function(eventBus, sinon) {

    describe("EventBus", function() {

        it("triggers event", function() {
            var spy = sinon.spy();

            eventBus.on("test", spy);
            eventBus.trigger("test");
            expect(spy).toHaveBeenCalledOnce();
        });

        it("turn off event", function() {
            var spy = sinon.spy();

            eventBus.on("test", spy);
            eventBus.off("test");
            eventBus.trigger("test");

            expect(spy).not.toHaveBeenCalled();
        });

        it("turn off all events", function() {
            var spy1 = sinon.spy();
            var spy2 = sinon.spy();

            eventBus.on("test1", spy1);
            eventBus.on("test2", spy2);

            eventBus.reset();
            eventBus.trigger("test1");
            eventBus.trigger("test2");

            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });
    });
});