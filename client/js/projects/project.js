Template.project.helpers({
	viewingProject: function() {
		return Session.get('viewingProject');
	}
});

Template.project.events({
	'click a.close': function(e) {
		e.preventDefault();
		
		Session.set('viewingProject', undefined);
		Router.go('/projects');
	}
});