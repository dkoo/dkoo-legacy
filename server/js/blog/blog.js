Meteor.methods({
	editPost: function(postId, input) {
		check(postId, String);
		check(input, Object);

		if ( postId === 'new' ) {
			var slug = Meteor.utils.makeSlug(input.title);

			return Posts.insert({
				title: input.title,
				slug: slug,
				content: input.content,
				published: input.published
			});
		} else {
			console.log(input.content);
			return Posts.update(postId, {
				$set: {
					title: input.title,
					content: input.content
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