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
});