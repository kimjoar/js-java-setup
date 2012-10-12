define(['underscore', 'backbone'], function(_, Backbone) {

  var SubViewHandler = function() {
    this.subViews = [];
  };

  _.extend(SubViewHandler.prototype, {
    addSubView: function(subView) {
      var subViewAlreadyExists = _.find(this.subViews, function(view) {
        return subView === view;
      });

      if (!subViewAlreadyExists) {
        this.subViews.push(subView);
        return subView;
      }

      return subViewAlreadyExists;
    },
    destroyAllSubViews: function() {
      _.invoke(this.subViews,  "destroy");

      this.subViews.length = 0;
    }
  });

  // Copy the `extend` function used by Backbone's classes
  SubViewHandler.extend = Backbone.View.extend;

  return SubViewHandler;

});
