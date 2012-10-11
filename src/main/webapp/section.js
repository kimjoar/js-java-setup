define(['underscore'], function(_) {

  var Section = function($baseEl, selector) {
    this.$baseEl = $baseEl;
    this.selector = selector;
  };

  _.extend(Section.prototype, {
    show: function(view) {
      this.ensureEl();
      this.open(view);
      this.currentView = view;
    },

    ensureEl: function() {
      if (!this.$el || this.$el.length === 0) {
        this.$el = this.$baseEl.find(this.selector);
      }
    },

    open: function(view) {
      this.$el.html(view.el);
    },

    close: function() {
      if (!this.currentView) return;

      this.currentView.destroy();

      delete this.currentView;
    }
  });

  return Section;

});
