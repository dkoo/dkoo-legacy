kootroller = RouteController.extend({
	// init actions based on URL
	onBeforeAction: function() {
		var query = this.params.query.search,
			post,
			data = this.data();

		if ( this.url === '/' ) {
			Session.set('viewingBlog', false);
		} else {
			Session.set('viewingBlog', true);
		}

		if ( this.url === '/blog' && query ) {
			Session.set('searching', true);
			Session.set('filter', decodeURI(query));
		}


		if ( data === false ) {
			this.render('notFound');
		} else {
			if ( data ) {
				this.render('home', data);
			} else {
				this.render('loading');
			}
		}
	},
	waitOn: function() {
		this.data();
	},
	// set the data context based on URL
	data: function() {
		var currentPost = Session.get('currentPost'),
			getPost,
			subscription,
			post;

		if ( this.params.slug ) {
		// if viewing a single post page
			Session.set('singlePost', true);

			if ( this.params.slug === 'new' ) {
				Session.set('editing', true);
			}

			if ( currentPost ) {
				getPost = { _id: currentPost };
			} else {
				getPost = { slug: this.params.slug };
			}

			subscription = Meteor.subscribe('posts', getPost, {}, '');

			if ( subscription.ready() ) {
				post = Posts.findOne( getPost );

				if ( !post ) {
					return false;
				}

				return post;
			}
		} else {
		// if viewing all posts
			Session.set('singlePost', false);
			return {};
		}
	},
	// dynamically update title and meta tags for SEO
	onAfterAction: function() {
		var post = this.data(),
			title,
			description;
		
		if ( this.url === '/blog' ) {
			SEO.set({
				title: 'dkoo dot net → blog'
			});

			return;
		} else if ( post ) {
			if ( post._id ) {
				title = post.title;
				description = Meteor.utils.excerpt(post);

				SEO.set({
					title: 'dkoo dot net → ' + post.title,
					meta: {
						'description': description
					},
					og: {
						'title': post.title,
						'description': description
					}
				});
			}
		}
	}
});


Router.route('/', { controller: kootroller } );

Router.route('/admin', function () {
	this.render('admin');
});

Router.route('/blog', { controller: kootroller }, function () {
	Session.set('editing', false);
});

Router.route('/blog/:slug', { controller: kootroller });

Router.configure({
	notFoundTemplate: 'notFound'
});