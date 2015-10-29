// print Date objects in human-readable form
Template.registerHelper('date', function() {
	var prettyDate = Meteor.utils.prettifyDate(new Date(this.published));

	return prettyDate[0] + ', ' + prettyDate[1] + ' at ' + prettyDate[2];
});

// determine post visibility status
Template.registerHelper('private', function() {
	return this.status === 'private' ? true : false;
});

Template.registerHelper('uri', function(tag) {
	return '/blog?search=' + encodeURI(this).replace('#', '%23');
});

Template.registerHelper('loading', function(){
	return Session.get('loading');
});

Template.registerHelper('statusIs', function(status) {
	return this.status === status ? true : false;
});