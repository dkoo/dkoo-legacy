function scroll(project) {
	if ( project ) {
		document.documentElement.classList.add('overflow');
	} else {
		document.documentElement.classList.remove('overflow');
	}
}

Tracker.autorun(function () {
	scroll(Session.get('viewingProject'));
});

Template.projects.onRendered(function() {
	document.documentElement.classList.add('no-scroll');
});

Template.projects.helpers({
	viewingProject: function() {
		return Session.get('viewingProject');
	},
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
		});

		results = Projects.find( { slug: { $not: 'about' } }, { sort: { published: 1 } } );

		Session.set('loading', false);
		return results.count() ? results : false;
	},
	thisProject: function() {
		var slug = FlowRouter.getParam('project') || Session.get('project'),
			project;

		if ( slug ) {
			Session.set('project', slug);
			project = Projects.findOne( { slug: slug } ) || {};

			if ( slug === 'new' ) {
				Session.set('editingProject', true);
				return {};
			} else {
				if ( !project._id ) {
					FlowRouter.go('/projects');
				}
			}
		} else {
			project = {};
		}

		return project;
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