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
	deletePost: function(postId) {
		check(postId, String);

		if ( this.userId ) {
			Posts.remove(postId);
		}
	}
});