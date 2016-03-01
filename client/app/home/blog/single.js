Template.single.helpers({
	thisPost: function() {
		var slug = FlowRouter.getParam('slug') || Session.get('thisPost'),
			post = Posts.findOne({slug: slug});

		if ( slug ) {
			Meteor.subscribe('posts', { slug: slug }, {}, '', function(err, response) {
				if ( err ) {
					console.log(error);
				}
				Session.set('loading', false);
			});
			post = Posts.findOne({ slug: slug });
		}

		if ( !!post ) {
			Session.set('thisPost', slug);
			return post;
		} else if ( FlowRouter.getParam('slug') === 'new') {
			Session.set('editing', true);
			return {};
		} else {
			if ( slug && !FlowRouter.getQueryParam('search') ) {
				FlowRouter.go('/blog');
			}
		}
	}
});