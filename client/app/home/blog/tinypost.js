Template.tinypost.helpers({
	excerpt: function() {
		return Meteor.utils.excerpt(this);
	}
});

Template.tinypost.events({
	'click .edit': function(e) {
		e.preventDefault();
		Session.set('editing', this._id);
		Router.go('/blog/' + this.slug);
	},
	'click .delete': function(e) {
		e.preventDefault();
		Meteor.call('deletePost', this._id);
		var blog = document.querySelector('section.blog');

		blog.classList.remove('post');
	}
});