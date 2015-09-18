Meteor.methods({
	editPost: function(postId, input) {
		check(postId, String);
		check(input, Object);

		if ( postId === 'new' ) {
			var slug = Meteor.utils.makeSlug(input.title);

			if ( slug ) {
				input.slug = slug;
			}

			return Posts.insert(input);
		} else {
			return Posts.update(postId, {
				$set: input
			});
		}
	},
	addTag: function(postId, tag) {
		check(postId, String);
		check(tag, String);

		var post = Posts.findOne( { _id: postId } ),
			tags = post.tags || [],
			newTags;

		tags.push(tag.trim());

		// TK: write a method to sort arrays alphanumerically
		// newTags = Meteor.utils.sortArray(tags, true);

		if ( Meteor.userId() ) {
			Posts.update(postId, {
				$set: {
					tags: tags.sort()
				}
			});
		}
	},
	removeTag: function(postId, tag) {
		check(postId, String);
		check(tag, String);

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
	},
	deletePost: function(postId) {
		check(postId, String);

		if ( this.userId ) {
			Posts.remove(postId);
		}
	}
});