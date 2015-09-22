// init Posts collection
Posts = new Mongo.Collection('posts');

Template.registerHelper('date', function() {
	var prettyDate = Meteor.utils.prettifyDate(new Date(this.published));

	return prettyDate[0] + ', ' + prettyDate[1] + ' at ' + prettyDate[2];
});

Template.registerHelper('private', function() {
	return this.status === 'private' ? true : false;
});

Meteor.startup(function() {
	Session.set('editing', false);

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