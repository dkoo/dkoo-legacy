Template.project.helpers({
	editingProject: function() {
		return Session.get('editingProject');
	}
});

Template.project.events({
	'click a.close': function(e) {
		e.preventDefault();

		Session.set('viewingProject', undefined);
		Session.set('editingProject', false);
		Router.go('/projects');
	},
	'click a.action': function(e) {
		e.preventDefault();
	},
	'click .delete': function(e) {
		e.preventDefault();
		Meteor.call('deleteProject', this._id);
		Router.go('/projects');
	},
	'click a.edit': function(e) {
		Session.set('editingProject', true);
	}
});