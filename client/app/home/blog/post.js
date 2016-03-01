Template.post.helpers({
	editing: function() {
		return Session.get('editing');
	}
});

Template.post.events({
	'click .edit': function(e) {
		e.preventDefault();
		Session.set('editing', this._id);
	},
	'click .delete': function(e) {
		e.preventDefault();
		Meteor.call('deletePost', this._id);
		FlowRouter.go('/blog');
	},
	'click .content img': function(e) {
		var img = {
			src: e.currentTarget.getAttribute('src'),
			caption: e.currentTarget.getAttribute('alt')
		};
		Session.set('modal', img);
	}
});