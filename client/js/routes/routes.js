Router.route('/', function () {
	Session.set('viewingBlog', false);
	this.render('home');
});

Router.route('/admin', function () {
	this.render('admin');
});

Router.route('/register', function () {
	this.render('register');
});

Router.route('/blog', function () {
	Session.set('viewingBlog', true);
	this.render('home');
});

Router.route('/blog/:slug', function () {
	Session.set('viewingBlog', true);
	Meteor.subscribe('posts');
	var post = Posts.findOne( { slug: this.params.slug } );

	this.render('home', { data: function() {
			return post;
		}
	});
});

Router.route('/edit', function () {
	var query = this.params.query,
		post;
	
	if ( query.post && query.post !== 'new' ) {
		Session.set('edit-post', query.post);
	} else {
		Session.set('edit-post', 'new');
	}
	this.render('edit');
});