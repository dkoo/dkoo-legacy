Template.project.helpers({
	viewingProject: function() {
		return Session.get('viewingProject');
	}
});

Template.project.events({
	'click a.close': function(e) {
		Session.set('viewingProject', undefined);
	}
});