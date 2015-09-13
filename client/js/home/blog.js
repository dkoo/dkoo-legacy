Template.blog.events({
	posts: function() {
		return Posts.find({}, {sort: {createdAt: -1}});
	}
});

Template.blog.events({
	'click .logout': function(e) {
		Meteor.logout();
	}
});