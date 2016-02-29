// startup functions
Meteor.startup(function() {
	Session.set('editing', false);

	document.body.addEventListener('keyup', function(e) {
		if ( e.keyCode === 27 && (!!Session.get('modal') || !!Session.get('viewingProject')) ) {
			if ( Session.get('modal') ) {
				Session.set('modal', undefined);
			}
			if ( Session.get('viewingProject') ) {
				Session.set('viewingProject', undefined);
				Session.set('editingProject', false);
				Router.go('/projects');
			}
		}
	});

	// default SEO title/meta tags
	return SEO.config({
		title: 'dkoo dot net',
		meta: {
			'description': 'Personal website of Derrick Koo, a Brooklyn-based writer and developer.'
		},
		og: {
			'title': 'dkoo dot net',
			'description': 'Personal website of Derrick Koo, a Brooklyn-based writer and developer.',
			'site_name': 'dkoo dot net',
			'url': 'http://dkoo.net',
			'image': 'http://dkoo.net/uploads/images/2230142.jpg'
		},
		twitter: {
			'title': 'dkoo dot net',
			'card': 'summary',
			'description': 'Personal website of Derrick Koo, a Brooklyn-based writer and developer.',
			'site_name': 'dkoo dot net',
			'site': '@derrick_koo',
			'image': 'http://dkoo.net/uploads/images/2230142.jpg'

		}
	});
});