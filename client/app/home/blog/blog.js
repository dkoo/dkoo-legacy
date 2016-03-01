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

		Session.set('loading', true);
		// setup the subscription
		Meteor.subscribe('posts', filter, options, search, function(err, response) {
			if ( err ) {
				console.log(err);
			}
		});

		results = Posts.find( filter, options );
		Session.set('loading', false);
		return results.count() ? results : false;
	},
	excerpt: function() {
		return Meteor.utils.excerpt(this);
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
	},
	thisPost: function() {
		var slug = FlowRouter.getParam('slug') || Session.get('thisPost'),
			post = Posts.findOne({slug: slug});

		if ( !post ) {
			Meteor.subscribe('posts', { slug: slug }, {}, '', function(err, response) {
				if ( err ) {
					console.log(error);
				}
				Session.set('loading', false);
			});
			post = Posts.findOne({ slug: slug });
		}

		if ( !!post ) {
			Session.set('thisPost', slug);
			return post;
		} else if ( FlowRouter.getParam('slug') === 'new') {
			Session.set('editing', true);
			return {};
		} else {
			if ( !FlowRouter.getQueryParam('search') ) {
				FlowRouter.go('/blog');
			}
		}
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
			FlowRouter.go('/blog');
		} else {
			Session.set('searching', true);
		}
	},
	// hack to fix broken overflow scrolling in iOS
	'touchstart div.posts, touchstart div.single': function(e) {
		if ( e.currentTarget.scrollTop === 0 ) {
			e.currentTarget.scrollTop = 1;
		}
		if (e.currentTarget.scrollTop === e.currentTarget.scrollHeight - e.currentTarget.clientHeight) {
			e.currentTarget.scrollTop = e.currentTarget.scrollHeight - e.currentTarget.clientHeight - 1;
		}
		e.stopPropagation();
	},
	'click .delete': function(e) {
		e.preventDefault();
		Meteor.call('deletePost', this._id);
		var blog = document.querySelector('section.blog');

		blog.classList.remove('post');
	}
});