// reusable function to reset application states
function reset() {
	Session.set('viewingBlog', false);
	Session.set('editing', false);
	Session.set('viewingProject', undefined);
	Session.set('editingProject', undefined);
	Session.set('singlePost', false);
	Session.set('modal', undefined);
}

FlowRouter.notFound = {
	action: function() {
		if ( Meteor.isClient ) {
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
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			var search = FlowRouter.getQueryParam('search');

			if ( search ) {
				Session.set('searching', true);
				Session.set('filter', search);
			} else {
				Session.set('searching', false);
				Session.set('filter', '');
			}

			Session.set('viewingBlog', true);
			document.title = 'dkoo dot net → blog';
			BlazeLayout.render('main', {content: 'home'});
		}
	}
});

blog.route('/:slug', {
	// preload subscription
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
			
			var post = Posts.findOne({ slug: FlowRouter.getParam('slug') });
			
			if ( post ) {
				document.title = 'dkoo dot net → ' + post.title;
			}

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