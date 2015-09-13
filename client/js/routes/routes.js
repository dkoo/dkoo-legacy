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

Router.route('/edit', function () {
	this.render('edit');
});