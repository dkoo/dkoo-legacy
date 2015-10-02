Template.home.helpers({
	loading: function() {
		return Session.get('loading');
	},
	viewingBlog: function() {
		return Session.get('viewingBlog');
	}
});