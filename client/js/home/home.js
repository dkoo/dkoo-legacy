Template.home.onRendered(function() {
	document.documentElement.classList.remove('no-scroll');
});

Template.home.helpers({
	modalExists: function() {
		return Session.get('modal');
	},
	viewingBlog: function() {
		return Session.get('viewingBlog');
	}
});