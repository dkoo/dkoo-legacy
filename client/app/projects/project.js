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
		FlowRouter.go('/projects');
	},
	'click a.action': function(e) {
		e.preventDefault();
	},
	'click .delete': function(e) {
		e.preventDefault();
		Meteor.call('deleteProject', this._id);
		FlowRouter.go('/projects');
	},
	'click a.edit': function(e) {
		Session.set('editingProject', true);
	},
	// hack to fix broken overflow scrolling in iOS
	'touchstart .project': function(e) {
		if ( e.currentTarget.scrollTop === 0 ) {
			e.currentTarget.scrollTop = 1;
		}
		if (e.currentTarget.scrollTop === e.currentTarget.scrollHeight - e.currentTarget.clientHeight) {
			e.currentTarget.scrollTop = e.currentTarget.scrollHeight - e.currentTarget.clientHeight - 1;
		}
		e.stopPropagation();
	}
});