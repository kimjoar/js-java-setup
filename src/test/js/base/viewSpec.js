define(['base/view', 'sinon'], function(View, sinon) {

    describe('View', function() {

        it('unbinds all events when destroyed', function() {
            var view = new View();
            sinon.stub(view, 'unbindAll');
            view.destroy();

            expect(view.unbindAll).toHaveBeenCalledOnce();

            view.unbindAll.restore();
        });

    });

});
