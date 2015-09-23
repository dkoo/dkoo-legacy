Meteor.methods({
	editPost: function(postId, input) {
		check(postId, String);

		// validate input (do not allow any keys or value types other than those listed below)
		check(input, { 
			title: Match.Optional(String),
			content: Match.Optional(String),
			tags: Match.Optional(Array),
			slug: Match.Optional(String),
			published: Match.Optional(Number),
			excerpt: Match.Optional(String),
			status: Match.Optional(String)
		});

		if ( Meteor.dkoo.checkUser(this.userId) ) {
			if ( postId === 'new' ) {

				if ( input.slug ) {
					// if the user has submitted a slug, sanitize and use that one
					input.slug = Meteor.utils.makeSlug(input.slug);
				} else {
					// otherwise, create a slug from the title
					var slug = Meteor.utils.makeSlug(input.title);
					input.slug = slug || Meteor.utils.makeSlug('post'); // super fallback if we can't create a slug for whatever reason
				}

				return Posts.insert(input);
			} else {
				var doc = Posts.findOne( { _id: postId } );

				if ( input.slug ) {
					if ( input.slug !== doc.slug ) {
						input.slug = Meteor.utils.makeSlug(input.slug);
					}
				}

				return Posts.update(postId, {
					$set: input
				});
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	addTag: function(postId, tag) {
		check(postId, String);
		check(tag, String);


		if ( Meteor.dkoo.checkUser(this.userId) ) {
			var post = Posts.findOne( { _id: postId } ),
				tags = post.tags || [],
				newTags;

			tags.push(tag.trim());

			if ( Meteor.userId() ) {
				Posts.update(postId, {
					$set: {
						tags: tags.sort()
					}
				});
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	removeTag: function(postId, tag) {
		check(postId, String);
		check(tag, String);

		if ( Meteor.dkoo.checkUser(this.userId) ) {
			var post = Posts.findOne( { _id: postId } ),
				tags = post.tags || [];

			for ( var i = 0, len = tags.length; i !== len; i++ ) {
				if ( tags[i] === tag ) {
					tags.splice(i, 1);
				}
			}
			if ( Meteor.userId() ) {
				Posts.update(postId, {
					$set: {
						tags: tags.sort()
					}
				});
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	deletePost: function(postId) {
		check(postId, String);

		if ( Meteor.dkoo.checkUser(this.userId) ) {
			Posts.remove(postId);
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	}
});