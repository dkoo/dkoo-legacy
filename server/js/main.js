// init Posts collection
Posts = new Mongo.Collection('posts');

Meteor.publish('posts', function (filter, options) {
	check(filter, Object);
	check(options, Object);

	if ( options.limit ) {
		if ( options.limit > Posts.find().count ) {
			options.limit = 0;
		}
	}

	return Posts.find( filter, options );
});