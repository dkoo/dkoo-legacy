projectroller = RouteController.extend({
	// init actions based on URL
	onBeforeAction: function() {
		var project = this.params.project; //,
			data = this.data();

		// if creating a new project
		if ( project === 'new' ) {
			Session.set('editingProject', true);
		} else {
			Session.set('editingProject', false);
		}

		if ( data === false ) {
			this.render('notFound');
		} else {
			this.render('projects', data);
		}
	},
	waitOn: function() {
		this.data();
	},
	data: function() {
		var currentProject = Session.get('currentProject'),
			getProject,
			subscription,
			project;

		if ( this.params.project ) {
		// if viewing a single post page
			Session.set('viewingProject', true);

			// if creating a new project
			if ( this.params.project === 'new' ) {
				return {};
			} else {
				if ( currentProject ) {
					getProject = { _id: currentProject };
				} else {
					getProject = { slug: this.params.project };
				}

				subscription = Meteor.subscribe('projects');

				if ( subscription.ready() ) {
					project = Projects.findOne( getProject );

					if ( !project ) {
						return false;
					}

					Session.set('loading', false);
					return project;
				}
			}
		} else {
		// if viewing all projects
			Session.set('viewingProject', undefined);
			Session.set('editingProject', false);
			return {};
		}
	},
	// dynamically update title and meta tags for SEO
	onAfterAction: function() {
		var project = this.data(),
			title,
			description;
		
		if ( this.url === '/projects' ) {
			SEO.set({
				title: 'dkoo dot net → projects'
			});

			return;
		} else if ( project ) {
			if ( project._id ) {
				title = project.title;
				description = Meteor.utils.excerpt(project);

				SEO.set({
					title: 'dkoo dot net → ' + project.title,
					meta: {
						'description': description
					},
					og: {
						'title': project.title,
						'description': description
					}
				});
			}
		}
	}

});

Router.route('/projects', { controller: projectroller } );

Router.route('/projects/:project', { controller: projectroller } );
