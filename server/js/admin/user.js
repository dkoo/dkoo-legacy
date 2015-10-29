Meteor.dkoo = {
	checkUser: function(userId) {
		var dkoo = Meteor.users.findOne( { username: 'dkoo' } );

		if ( dkoo._id === userId ) {
			return true;
		} else {
			return false;
		}
	}
};

Meteor.users.deny({
	update: function() {
		return true;
	}
});