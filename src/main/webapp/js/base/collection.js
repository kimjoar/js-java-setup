define(['backbone', 'component/sync'], function(Backbone, sync) {

    var Collection = Backbone.Collection.extend({

        sync: sync

    });

    return Collection;

});
