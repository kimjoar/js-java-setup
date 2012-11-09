define(['component/sync', 'backbone'], function(sync, Backbone) {

    describe('sync', function() {

        var method, model, options;

        beforeEach(function() {
            sinon.stub(Backbone, 'sync');

            method = "CREATE";
            model = {};
            options = {};
        });

        afterEach(function() {
            Backbone.sync.restore();
        });

        it('throws an error when no url is present', function() {
            expect(function() {
                sync(method, model, options);
            }).toThrow('A "url" property or function must be specified');
        });

        describe('prepends the base url when', function() {

            it('the url is in the options', function() {
                options.url = '/options';

                sync(method, model, options);

                var args = Backbone.sync.firstCall.args;

                expect(args[2].url).toEqual('/rest/options');
            });

            it('the url is specified as a string in the model', function() {
                model.url = '/model';

                sync(method, model, options);

                var args = Backbone.sync.firstCall.args;

                expect(args[2].url).toEqual('/rest/model');
            });

            it('the url is specified as a function in the model', function() {
                model.url = function() {
                  return '/model-func';
                }

                sync(method, model, options);

                var args = Backbone.sync.firstCall.args;

                expect(args[2].url).toEqual('/rest/model-func');
            });

        });

    });

});
