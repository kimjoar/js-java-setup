define(['underscore'], function(_) {

    var SubViewHandler = function() {
        this.subViews = [];
    };

    _.extend(SubViewHandler.prototype, {

        addSubView: function(subView) {
            // it's easy to add an undefined view if you forget
            // to 'return this' in a render
            if (_.isUndefined(subView)) {
                throw "Subview can't be undefined";
            }

            if (!_.contains(this.subViews, subView)) {
                this.subViews.push(subView);
            }
        },

        destroySubViews: function() {
            _.invoke(this.subViews, 'destroy');
            this.subViews.length = 0;
        }
    });

    return SubViewHandler;

});
