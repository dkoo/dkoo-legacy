// init Posts collection
Posts = new Mongo.Collection('posts');

// startup functions
Meteor.startup(function() {
	Session.set('editing', false);

	document.body.addEventListener('keyup', function(e) {
		if ( e.keyCode === 27 && !!Session.set('modal') ) {
			Session.set('modal', undefined);
		}
	});

	// default SEO title/meta tags
	return SEO.config({
		title: 'dkoo dot net',
		meta: {
			'description': 'Thought bubbles from Derrick Koo, a Brooklyn-based writer and developer trying to learn new things every day.'
		},
		og: {
			'title': 'dkoo dot net',
			'description': 'Thought bubbles from Derrick Koo, a Brooklyn-based writer and developer trying to learn new things every day.',
			'site_name': 'dkoo dot net',
			'url': 'http://dkoo.net',
			'image': 'http://dkoo.net/uploads/images/2230142.jpg'
		},
		twitter: {
			'title': 'dkoo dot net',
			'card': 'summary',
			'description': 'Thought bubbles from Derrick Koo, a Brooklyn-based writer and developer trying to learn new things every day.',
			'site_name': 'dkoo dot net',
			'site': '@derrick_koo',
			'image': 'http://dkoo.net/uploads/images/2230142.jpg'

		}
	});
});