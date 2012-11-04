define(['underscore'], function(_) {

    var SubViewHandler = function() {
        this.subViews = [];
    };

    _.extend(SubViewHandler.prototype, {

        addSubView: function(subView) {
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
