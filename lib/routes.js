// reusable function to reset application states
function reset() {
	Session.set('viewingBlog', false);
	Session.set('editing', false);
	Session.set('viewingProject', undefined);
	Session.set('editingProject', undefined);
	Session.set('searching', false);
	Session.set('singlePost', false);
	Session.set('modal', undefined);
}

FlowRouter.notFound = {
	action: function() {
		if ( Meteor.isClient ) {
			Session.set('loading', true);
			FlowRouter.go('/');
		}
	}
};

// root
FlowRouter.route('/', {
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			document.title = 'dkoo dot net';
			BlazeLayout.render('main', {content: 'home'});
		}
	}
});

// login route
var accounts = FlowRouter.group({
	name: 'accounts'
});

accounts.route('/admin', {
	action: function() {
		if ( Meteor.isClient ) {
			if ( !!Meteor.user() ) {
				FlowRouter.go('/');
			} else {
				reset();
				document.title = 'Log In';
				BlazeLayout.render('main', {content: 'admin'});
			}
		}
	}
});

// blog routes
var blog = FlowRouter.group({
	prefix: '/blog',
	name: 'blog'
});

blog.route('/', {
	// subscriptions: function(params, queryParams) {
	// 	// defaults
	// 	var filter = {},
	// 		search = '',
	// 		limit = 10,
	// 		now = Date.now(),
	// 		options = {
	// 			limit: limit,
	// 			sort: { published: -1 }
	// 		},
	// 		results;

	// 	// gather session info
	// 	if ( Meteor.isClient ) {
	// 		search = Session.get('filter') || '';
	// 		limit = Session.get('subLimit') || 10;
	// 		now = Session.get('now') || Date.now();
	// 		options = Session.get('subOptions') || {
	// 			limit: limit,
	// 			sort: { published: -1 }
	// 		};
	// 	}

	// 	// if not logged in, limit visible posts
	// 	if ( !Meteor.user() && !this.userId ) {
	// 		filter.status = 'public';
	// 		filter.published = { $lte: now };
	// 	}

	// 	this.register('posts', Meteor.subscribe('posts', filter, options, search));
	// },
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			var search = FlowRouter.getQueryParam('search');

			if ( search ) {
				Session.set('searching', true);
				Session.set('filter', search);
			}

			Session.set('viewingBlog', true);
			BlazeLayout.render('main', {content: 'home'});
		}
	}
});

blog.route('/:slug', {
	subscriptions: function(params, queryParams) {
		if ( params.slug === 'new' ) {
			return;
		} else {
			this.register('post', Meteor.subscribe('posts', { slug: params.slug }, {}, ''));
		}
	},
	action: function() {
		if ( Meteor.isClient ) {
			if ( FlowRouter.getParam('slug') === 'new' ) {
				Session.set('editing', true);
			}
			reset();
			Session.set('viewingBlog', true);
			Session.set('singlePost', true);
			BlazeLayout.render('main', {content: 'home'});
		}
	}
});

// project routes
var projects = FlowRouter.group({
	prefix: '/projects',
	name: 'projects'
});

projects.route('/', {
	subscriptions: function(params, queryParams) {
		this.register('projects', Meteor.subscribe('projects'));
	},
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			BlazeLayout.render('main', {content: 'projects'});
			document.title = 'dkoo dot net → projects';
		}
	}
});

projects.route('/:project', {
	subscriptions: function(params, queryParams) {
		this.register('projects', Meteor.subscribe('projects'));
	},
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			BlazeLayout.render('main', {content: 'projects'});
			Session.set('viewingProject', true);
		}
	}
});

// about route
FlowRouter.route('/about', {
	subscriptions: function(params, queryParams) {
		this.register('projects', Meteor.subscribe('projects'));
	},
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			BlazeLayout.render('main', {content: 'projects'});
			Session.set('viewingProject', true);
			Session.set('project', 'about');
		}
	}
});