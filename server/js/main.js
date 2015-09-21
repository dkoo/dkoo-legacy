// init Posts collection
Posts = new Mongo.Collection('posts');

Meteor.publish('posts', function (filter, options, search) {
	check(filter, Object);
	check(options, Object);
	check(search, String);

	if ( options.limit ) {
		if ( options.limit > Posts.find().count ) {
			options.limit = 0;
		}
	}

	if ( search ) {
		filter['$or'] = [
			{ title: { $regex: new RegExp('(?=.*' + search + ').*', 'i') } },
			{ content: { $regex: new RegExp('(?=.*' + search + ').*' + '.*', 'i') } },
			{ tags: { $regex: new RegExp('(?=.*' + search + ').*' + '.*', 'i') } },
			{ published: { $gte: Date.parse(search), $lte: Date.parse(search) + 86400000 } }
		];
	}

	return Posts.find( filter, options );
});