Template.blog.helpers({
	singlePost: function() {
		var postId = this._id;

		return postId ? true : false;
	},
	posts: function() {
		Meteor.subscribe('posts');

		return Posts.find({}, {sort: {published: -1}});
	}
});

Template.blog.events({
	'click .logout': function(e) {
		Meteor.logout();
	}
});