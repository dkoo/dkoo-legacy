Meteor.startup(function() {
	var dkoo = Meteor.users.findOne( { username: 'dkoo' } );

	Meteor.users.update(dkoo._id, {
		$set: {
			'profile.interests': ['guitar', 'songwriting', 'audio production', 'psychedelic rock', 'running', 'hiking', 'biking', 'skiing', 'goju-ryu karate']
		}
	});
});

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