Router.route('/projects', function() {
	this.render('projects');
});

Router.route('/projects/:slug', function() {
	this.render('projects');
});
