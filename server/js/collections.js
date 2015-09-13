// init Posts collection
Posts = new Mongo.Collection('posts');

Meteor.publish('posts', function () {
	return Yums.find({
		owner: 'dkoo'
	});
});