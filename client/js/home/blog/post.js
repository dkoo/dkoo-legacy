Template.post.helpers({
	editing: function() {
		return Session.get('editing');
	},
	thePost: function() {
		var postId = Session.get('currentPost'),
			post = Posts.findOne({ _id: postId });

		console.log(post);

		return post;
	},
	uri: function(tag) {
		return '/blog?search=' + encodeURI(this);
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
		Router.go('/blog');
	}
});