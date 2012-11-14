define(['component/section', 'base/view', 'jquery', 'sinon'], function(Section, View, $, sinon) {

    describe("Section", function() {
        describe("show a view", function() {
            var $baseEl, section, view;

            beforeEach(function() {
                $baseEl = $('<div><div class="main"></div></div>');
                section = new Section($baseEl, '.main');
                view = new View({ el: $("<h1>view</h1>") });
                view.render();
            });

            it("inserts it into the DOM", function() {
                section.show(view);

                expect($baseEl.find('h1').length).toEqual(1);
            });

            it("closes the current view", function() {
                section.show(view);

                var spy = sinon.spy(section.currentView, "destroy");

                section.show(view);

                expect(spy).toHaveBeenCalledOnce();
            });
        });

        describe("close a view", function() {

          it("handles no currently rendered view", function() {
              var section = new Section($('<div></div>'), '.main');

              section.close();

              // intentionally no expectations, as the code would fail with a TypeError if trying to close 'undefined'
          });

        });
    });

});
