// print Date objects in human-readable form
Template.registerHelper('date', function() {
	var prettyDate = Meteor.utils.prettifyDate(new Date(this.published));

	return prettyDate[0] + ', ' + prettyDate[1] + ' at ' + prettyDate[2];
});

// determine post visibility status
Template.registerHelper('private', function() {
	return this.status === 'private' ? true : false;
});

// encode URL strings for search
Template.registerHelper('uri', function(tag) {
	return '/blog?search=' + encodeURI(this).replace('#', '%23');
});

// check loading state
Template.registerHelper('loading', function(){
	return Session.get('loading');
});

// check current status
Template.registerHelper('statusIs', function(status) {
	return this.status === status ? true : false;
});

// check modal state
Template.registerHelper('modalExists', function() {
	return Session.get('modal');
});