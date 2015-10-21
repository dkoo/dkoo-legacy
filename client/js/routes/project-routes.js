projectroller = RouteController.extend({
	// init actions based on URL
	onBeforeAction: function() {
		var project = this.params.project; //,
			// data = this.data();

		if ( this.url === '/projects' ) {
			Session.set('viewingProject', undefined);
		} else if ( project ) {
			Session.set('viewingProject', true);
		}

		// if ( data === false ) {
		// 	this.render('notFound');
		// } else {
		// 	this.render('home', data);
		// }
		this.render('projects');
	}

});

Router.route('/projects', { controller: projectroller } );

Router.route('/projects/:project', { controller: projectroller } );
