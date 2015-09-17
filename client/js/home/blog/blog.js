// Template.blog.onRendered(function() {

// });

Template.blog.helpers({
	singlePost: function() {
		var postId = this._id || Session.get('editing') || Session.get('singlePost');

		return postId ? true : false;
	},
	posts: function() {
		return Posts.find({}, { sort: { published: -1 } } );
	}
});

Template.blog.events({
	'click .logout': function(e) {
		Meteor.logout();
	}
});