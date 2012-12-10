define(['base/model'], function(Model) {

    var User = Model.extend({
		defaults: {
			name: undefined,
			age: undefined
		}
    });

    return User;

});
