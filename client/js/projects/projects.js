Template.projects.helpers({
});

Template.projects.events({
	'click section figure a': function(e) {
		e.preventDefault();

		Session.set('viewingProject', true);
	},
	'click #toolbar .new-project': function(e) {
		Session.set('viewingProject', 'new');
		Session.set('editingProject', true);
	}
});