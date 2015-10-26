Meteor.methods({
	editProject: function(projectId, input) {
		check(projectId, String);

		// validate input (do not allow any keys or value types other than those listed below)
		check(input, { 
			title: Match.Optional(String),
			content: Match.Optional(String),
			images: Match.Optional(Array),
			thumb: Match.Optional(String),
			slug: Match.Optional(String),
			published: Match.Optional(Number),
			status: Match.Optional(String)
		});

		if ( Meteor.dkoo.checkUser(this.userId) ) {
			if ( projectId === 'new' ) {

				if ( input.slug ) {
					// if the user has submitted a slug, sanitize and use that one
					input.slug = Meteor.utils.makeSlug(input.slug);
				} else {
					// otherwise, create a slug from the title
					var slug = Meteor.utils.makeSlug(input.title);
					input.slug = slug || Meteor.utils.makeSlug('project'); // super fallback if we can't create a slug for whatever reason
				}
				return Projects.insert(input);
			} else {
				var doc = Projects.findOne( { _id: projectId } );

				if ( input.slug ) {
					if ( input.slug !== doc.slug ) {
						input.slug = Meteor.utils.makeSlug(input.slug);
					}
				}

				return Projects.update(projectId, {
					$set: input
				});
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	addImage: function(projectId, image) {
		check(projectId, String);
		check(image, String);


		if ( Meteor.dkoo.checkUser(this.userId) ) {
			var project = Projects.findOne( { _id: projectId } ),
				images = project.images || [],
				newTags;

			images.push(image.trim());

			if ( Meteor.userId() ) {
				Projects.update(projectId, {
					$set: {
						images: images.sort()
					}
				});
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	removeImg: function(projectId, image) {
		check(projectId, String);
		check(image, String);

		if ( Meteor.dkoo.checkUser(this.userId) ) {
			var project = Projects.findOne( { _id: projectId } ),
				images = project.images || [];

			for ( var i = 0, len = images.length; i !== len; i++ ) {
				if ( images[i] === image ) {
					images.splice(i, 1);
				}
			}
			if ( Meteor.userId() ) {
				Projects.update(projectId, {
					$set: {
						images: images.sort()
					}
				});
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	deleteProject: function(projectId) {
		check(projectId, String);

		if ( Meteor.dkoo.checkUser(this.userId) ) {
			Projects.remove(projectId);
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	}
});