Template.projects.helpers({
	projects: function() {
		var filter = {},
			now = Session.get('now') || Date.now(),
			results;

		// if not logged in, limit visible projects
		if ( !Meteor.user() ) {
			filter.status = 'public';
			filter.published = { $lte: now };
		}

		Session.set('loading', true);

		// setup the subscription
		Meteor.subscribe('projects', function(err, response) {
			if ( err ) {
				console.log(err);
			}
			Session.set('loading', false);
		});

		results = Projects.find({}, { sort: { published: 1 } } );

		return results.count() ? results : false;
	}
});

Template.projects.events({
	'click section figure a': function(e) {
		// e.preventDefault();

		Session.set('viewingProject', true);
	},
	'click #toolbar .new-project': function(e) {
		Session.set('viewingProject', 'new');
		Session.set('editingProject', true);
	},
	'click #toolbar .logout': function(e) {
		Meteor.logout();
	}
});