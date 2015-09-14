// init Posts collection
Posts = new Mongo.Collection('posts');

Template.registerHelper('date', function() {
	return Meteor.utils.prettifyDate(this.published);
});

Meteor.startup(function() {
	Session.set('editing', false);
});