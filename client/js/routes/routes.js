Router.route('/', function () {
	Session.set('viewingBlog', false);
	this.render('home');
});

Router.route('/admin', function () {
	this.render('accounts');
});


Router.route('/blog', function () {
	Session.set('viewingBlog', true);
	this.render('home');
});