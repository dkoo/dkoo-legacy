Template.home.onRendered(function() {
	document.documentElement.classList.remove('no-scroll');
});

Template.home.helpers({
	viewingBlog: function() {
		return Session.get('viewingBlog');
	}
});