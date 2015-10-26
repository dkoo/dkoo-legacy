Template.editProject.onRendered(function() {
	var data = Template.currentData() || undefined,
		content = document.querySelector('.content');

	content.style.height = content.scrollHeight + 'px';

	if ( !data ) {
		data = {
			_id: false
		}
	}

	if ( data._id ) {
		var fields = document.getElementsByTagName('pre'),
			field,
			prettyDate = Meteor.utils.prettifyDate(new Date(data.published));

		for ( var i = 0, len = fields.length; i !== len; i++ ) {
			field = fields[i].getAttribute('data-name');

			if ( field === 'published-date' ) {
				fields[i].textContent = prettyDate[1];
			} else if ( field === 'published-time' ) {
				fields[i].textContent = prettyDate[2];
			} else {
				fields[i].textContent = data[field];
			}
		}
	}
});

Template.editProject.helpers({
	newProject: function() {
		return !this._id ? true : false;
	},
	projectTitle: function() {
		var title = this.title || '',
			HTML = '<pre contentEditable class="title" data-name="title" data-placeholder="Project Title">' + title + '</pre>';

		return HTML;
	},
	statusIs: function(status) {
		return false;
	}
});

Template.editProject.events({
	'click .save': function(e) {
		Session.set('editingProject', false);
		if ( !this._id ) {
			Router.go('/projects');
		}
	},
	'click .cancel': function(e) {
		e.preventDefault();
		Session.set('editingProject', false);
		if ( !this._id ) {
			Session.set('viewingProject', false);
			Router.go('/projects');
		}
	},
	'onchange textarea, keyup textarea': function(e) {
		input = e.target.value;

		if ( !input ) {
			e.target.style.height = '2.5em';
		} else {
			e.target.style.height = e.target.scrollHeight + 'px';
		}
	},
	'click .add-image, keydown input.image': function(e) {
		var field = e.target.value ? e.target : document.querySelector('input.image'),
			input = field.value;

		if ( e.keyCode === 13 || e.target.tagName === 'A' ) {
			e.preventDefault();

			if ( input ) {
				Meteor.call('addImage', this._id, input);
			}

			field.value = '';
		}
	},
	'click figure img': function(e) {
		e.preventDefault();

		var doc = Template.currentData();

		Meteor.call('removeImg', doc._id, this.valueOf());
	},
	'submit .edit-project': function(e) {
		e.preventDefault();

		console.log('submitting');

		// gather all the user input
		var title = document.querySelector('h1 pre'),
			published = document.querySelectorAll('h2 pre'),
			content = e.target.content,
			images = e.target.images,
			// excerpt = document.querySelector('h3 pre'),
			slug = e.target.slug,
			imgArr,
			thumb = e.target.thumb,
			project = this._id ? this : { _id: 'new' },
			// get a date number from the entered date and time, if any
			date = Meteor.utils.getUTC(published[0].textContent.trim(), published[1].textContent.trim()),
			status = e.target.visibility,
			input = {
				title: title.textContent.trim(),
				content: content.value.trim(),
				status: status.value
			};

		if ( date ) {
			input.published = date;
		} else {
			if ( project._id === 'new' ) {
				input.published = Date.now();
			}
		}

		if ( images ) {
			if ( images.value ) {
				imgArr = images.value.split('\n');
				input.images = imgArr;
			}
		}

		if ( thumb.value ) {
			input.thumb = thumb.value;
		}

		if ( slug.value ) {
			if ( slug.value !== project.slug ) {
				input.slug = slug.value.trim();
			}
		}

		if ( input.title && input.content ) {
			Meteor.call('editProject', project._id, input, function(err, response) {
				if ( err ) {
					console.log(err);
				} else {
					Session.set('editing', false);
					console.log(response);
					if ( input.slug || project._id === 'new' ) {
						Router.go('/projects/');
					}
				}
			});
		} else {
			Meteor.utils.appendMessages(e.target, '<p><i class="fa fa-exclamation-circle"></i> Title and content are required.</p>');
		}
	}
});