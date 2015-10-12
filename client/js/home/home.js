Template.home.helpers({
	loading: function() {
		return Session.get('loading');
	},
	modalExists: function() {
		return Session.get('modal');
	},
	viewingBlog: function() {
		return Session.get('viewingBlog');
	}
});