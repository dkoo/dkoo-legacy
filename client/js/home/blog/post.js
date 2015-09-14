Template.post.helpers({
	editing: function() {
		return Session.get('editing');
	}
});

Template.post.events({
	'click .back': function(e) {
		e.preventDefault();

		var blog = document.querySelector('section.blog');

		blog.classList.remove('post');
	},
	'webkitTransitionEnd .content, oTransitionEnd .content, transitionEnd .content, msTransitionEnd .content, transitionend .content': function(e) {
		Router.go('/blog');
	},
	'click .edit': function(e) {
		e.preventDefault();
		Session.set('editing', this._id);
	},
	'click .delete': function(e) {
		Meteor.call('deletePost', this._id);
		Router.go('/blog');
	}
});