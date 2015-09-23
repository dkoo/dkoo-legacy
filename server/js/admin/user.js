Meteor.startup(function() {
	var dkoo = Meteor.users.findOne( { username: 'dkoo' } );

	if ( !dkoo ) {
		var user = {
			username: 'dkoo',
			email: 'citizenkoo@gmail.com',
			password: 'm0ch123*',
			profile: {
				name: 'Derrick Koo',
				location: 'Brooklyn, NY',
				url: 'http://dkoo.net',
				email: 'd@dkoo.net',
				social: {
					github: 'http://github.com/dkoo',
					instagram: 'https://instagram.com/dkoooooooo/',
					twitter: 'https://twitter.com/derrick_koo',
					linkedin: 'https://www.linkedin.com/pub/derrick-koo/1/966/614',
				},
				professional: {
					employer: 'The New Yorker',
					url: 'http://www.newyorker.com',
					title: ['Developer', 'Digital Production Manager'],
					started: new Date('June 2009')
				},
				skills: ['writing', 'digital production', 'print production', 'web development'],
				languages: ['javascript', 'css', 'html', 'php', 'python', 'applescript', 'english', 'basic spanish', 'basic french', 'basic mandarin'],
				interests: ['guitar', 'songwriting', 'audio production', 'doom metal', 'psychedelic rock', 'running', 'hiking', 'biking', 'goju-ryu karate', 'ashtanga yoga']
			}
		};

		Accounts.createUser(user);
	}
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