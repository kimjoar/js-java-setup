define(['component/subViewHandler', 'sinon'], function(SubViewHandler, sinon) {

    describe('subview handler', function() {

        it('can add and destroy views', function() {
            var view = {
                destroy: sinon.spy()
            };

            var subViewHandler = new SubViewHandler();

            subViewHandler.addSubView(view);

            subViewHandler.destroySubViews();

            expect(view.destroy).toHaveBeenCalledOnce();
        });

        it('will only add the same view once', function() {
            var view = {
                destroy: sinon.spy()
            };

            var subViewHandler = new SubViewHandler();

            subViewHandler.addSubView(view);
            subViewHandler.addSubView(view);
            subViewHandler.addSubView(view);

            subViewHandler.destroySubViews();

            expect(view.destroy).toHaveBeenCalledOnce();
        });

        it('throws an exception when adding "undefined"', function() {
            var subViewHandler = new SubViewHandler();

            var add = function() {
                subViewHandler.addSubView(undefined);
            };

            expect(add).toThrow();
        });

    });

});
