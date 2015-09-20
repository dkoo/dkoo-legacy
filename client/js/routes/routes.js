kootroller = RouteController.extend({
	onBeforeAction: function() {
		var filter = Session.get('subFilters') || {},
			limit = Session.get('subLimit') || 10,
			options = Session.get('subOptions') || {
				limit: limit,
				sort: { published: -1 }
			},
			currentPost = Session.get('currentPost'),
			query,
			post,
			data = {},
			now = Session.get('now') || Date.now();

		if ( !Meteor.user() ) {
			filter.status = 'public';
			filter.published = { $lte: now };
		}

		Session.set('searching', false);

		if ( this.url === '/' ) {
			Session.set('viewingBlog', false);
		} else {
			Session.set('viewingBlog', true);
		}

		// setup the subscription
		Meteor.subscribe('posts', filter, options );

		if ( this.params.slug ) {
			Session.set('singlePost', true);
			if ( this.params.slug === 'new' ) {
				Session.set('editing', true);
			}

			if ( currentPost ) {
				query = { _id: currentPost };
			} else {
				query = { slug: this.params.slug };
			}

			post = Posts.findOne( query );

			if ( !post ) {
				Session.set('subFilters', query);
				post = Posts.findOne( query );
			}

			data.data = function() {
				return post;
			};
		} else {
			Session.set('singlePost', false);
			Session.set('subFilters', false);
		}

		this.render('home', data);
	}
});


Router.route('/', { controller: kootroller } );

Router.route('/admin', function () {
	this.render('admin');
});

Router.route('/register', function () {
	this.render('register');
});

Router.route('/blog', { controller: kootroller }, function () {
	Session.set('editing', false);
	Session.set('subFilters', null);
});

Router.route('/blog/:slug', { controller: kootroller });

// Router.route('/search', function() {
// 	Session.set('viewingBlog', true);
// 	this.render('search');
// });