Template.blog.onRendered(function() {
	// reset 'now' variable every minute, so that new posts appear automatically
	Meteor.setInterval(function() {
		Session.set('now', Date.now());
	}, 60000);
});

Template.blog.helpers({
	singlePost: function() {
		var postId = this._id || Session.get('editing') || Session.get('singlePost');

		return postId ? true : false;
	},
	posts: function() {
		var filter = {},
			search = Session.get('filter') || '',
			limit = Session.get('subLimit') || 10,
			now = Session.get('now') || Date.now(),
			options = Session.get('subOptions') || {
				limit: limit,
				sort: { published: -1 }
			},
			results;

		// if not logged in, limit visible posts
		if ( !Meteor.user() ) {
			filter.status = 'public';
			filter.published = { $lte: now };
		}

		// setup the subscription
		Meteor.subscribe('posts', filter, options, search );

		results = Posts.find( filter, { sort: { published: -1 } } );

		return results.count() ? results : false;
	},
	more: function() {
		var limit = Session.get('subLimit') || 10,
			count = Posts.find().count();

		// bug: if the total number of posts is a multiple of 10, the 'more' button will always be visible
		if ( count < limit ) {
			return false;
		} else {
			return true;
		}
	},
	searching: function() {
		return Session.get('searching');
	}
});

Template.blog.events({
	'click .logout': function(e) {
		Meteor.logout();
	},
	'click .more': function(e) {
		var limit = Session.get('subLimit') || 10;

		Session.set('subLimit', limit + 10);
	},
	// infinite scroll
	'scroll .posts': function(e) {
		if ( window.innerHeight + e.target.scrollTop >= e.target.scrollHeight - 50 ) {
			var limit = Session.get('subLimit') || 10;
			Session.set('subLimit', limit + 10);
		}
	},
	'click a.search': function(e) {
		e.preventDefault();

		if ( Session.get('searching') ) {
			Session.set('searching', false);
			Session.set('filter', '');
			Router.go('/blog');
		} else {
			Session.set('searching', true);
		}
	}
});