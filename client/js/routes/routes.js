kootroller = RouteController.extend({
	onBeforeAction: function() {
		var query = this.params.query.search,
			post,
			data = {};

		// Session.set('searching', false);

		if ( this.url === '/' ) {
			Session.set('viewingBlog', false);
		} else {
			Session.set('viewingBlog', true);
		}

		if ( this.url === '/blog' && query ) {
			Session.set('searching', true);
			Session.set('filter', decodeURI(query));
		}

		if ( this.params.slug ) {
			Session.set('singlePost', true);
			if ( this.params.slug === 'new' ) {
				Session.set('editing', true);
			}

			data = this.data();
		} else {
			Session.set('singlePost', false);
		}

		this.render('home', data);
	},
	data: function() {
		var currentPost = Session.get('currentPost'),
			getPost;

		if ( currentPost ) {
			getPost = { _id: currentPost };
		} else {
			getPost = { slug: this.params.slug };
		}

		Meteor.subscribe('posts', getPost, {}, '');
		post = Posts.findOne( getPost );

		if ( !post ) {
			post = Posts.findOne( getPost );
		}

		return post;
	},
	onAfterAction: function() {
		var post = this.data(),
			title,
			description;
		
		if ( post ) {
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
		} else if ( this.url === '/blog' ) {
			SEO.set({
				title: 'dkoo dot net → blog'
			});
		}
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
});

Router.route('/blog/:slug', { controller: kootroller });

Router.configure({
	notFoundTemplate: 'notFound'
});