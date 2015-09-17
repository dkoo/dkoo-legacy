Template.tinypost.helpers({
	excerpt: function() {
		var array = this.content.split(' '),
			excerpt = array.slice(0, 50).join(' ') + '&#160;&#8230;';

		return excerpt.length >= 50 ? excerpt : this.content;
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