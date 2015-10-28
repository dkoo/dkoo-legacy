// init Posts collection
Posts = new Mongo.Collection('posts');

Meteor.startup(function() {
	Meteor.setInterval(function() {
		Meteor.now = Date.now();
	}, 60000);
});

Meteor.publish('posts', function (filter, options, search) {
	check(filter, Object);
	check(options, Object);
	check(search, String);

	if ( options.limit ) {
		if ( options.limit > Posts.find().count ) {
			options.limit = 0;
		}
	}

	// double-check user status before publishing private documents
	if ( !Meteor.dkoo.checkUser(this.userId) ) {
		if ( !filter.status ) { 
			filter.status = 'public';
		}

		if ( !filter.published ) { 
			filter.published = { $lte: Meteor.now };
		}
	}

	if ( search ) {
		// simple sanitization to strip any tag-like strings
		search = search.replace(/<(?:.|\n)*?>/gm, '');

		filter['$or'] = [
			{ title: { $regex: new RegExp('(?=.*' + search + ').*', 'i') } },
			{ content: { $regex: new RegExp('(?=.*' + search + ').*' + '.*', 'i') } },
			{ tags: { $regex: new RegExp('(?=.*' + search + ').*' + '.*', 'i') } },
			{ published: { $gte: Date.parse(search), $lte: Date.parse(search) + 86400000 } } // date queries should find all posts within a 24-hour period
		];
	}

	return Posts.find( filter, options );
});

// init Projects collection
Projects = new Mongo.Collection('projects');

Meteor.publish('projects', function () {
	var filter = {};

	// double-check user status before publishing private documents
	if ( !Meteor.dkoo.checkUser(this.userId) ) {
		filter.status = 'public';
	}

	return Projects.find( filter );
});