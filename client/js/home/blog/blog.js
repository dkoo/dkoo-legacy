Template.blog.onRendered(function() {
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
			};


		if ( !Meteor.user() ) {
			filter.status = 'public';
			filter.published = { $lte: now };
		}

		// setup the subscription
		Meteor.subscribe('posts', filter, options, search );

		return Posts.find( filter, { sort: { published: -1 } } );
	},
	more: function() {
		var limit = Session.get('subLimit') || 10,
			count = Posts.find().count();

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
	'scroll .posts': function(e) {
		if ( window.innerHeight + e.target.scrollTop >= e.target.scrollHeight - 50 ) {
			var limit = Session.get('subLimit') || 10;
			Session.set('subLimit', limit + 10);
		}
	},
	'click a.search': function(e) {
		e.preventDefault();

		if ( Session.get('searching') ) {
			Session.set('searching', false)
			Session.set('filter', '');
			Router.go('/blog');
		} else {
			Session.set('searching', true);
		}
	}
});