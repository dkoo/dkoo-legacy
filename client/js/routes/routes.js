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
	Session.set('editing', false);
	this.render('home');
});

Router.route('/blog/:slug', function () {
	Session.set('viewingBlog', true);
	Meteor.subscribe('posts');
	var post = Posts.findOne( { slug: this.params.slug } );

	if ( post ) {
		this.render('home', { data: function() {
				return post;
			}
		});
	}
});

Router.route('/post/new', function() {
	Session.set('viewingBlog', true);
	Session.set('editing', true);
	this.render('home');
});