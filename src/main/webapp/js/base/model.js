define(['backbone', 'component/sync'], function(Backbone, sync) {

    var Model = Backbone.Model.extend({

        sync: sync

    });

    return Model;

});
