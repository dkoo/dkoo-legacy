Template.edit.onRendered(function() {
	Session.set('edited', false);
	var post = Session.get('editing'),
		data = Template.currentData() || undefined,
		content = document.querySelector('.content textarea');

	content.style.height = content.scrollHeight + 'px';

	if ( data ) {
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

Template.edit.helpers({
	newPost: function() {
		return !this._id ? true : false;
	},
	edited: function() {
		return Session.get('edited');
	},
	statusIs: function(status) {
		return this.status === status ? true : false;
	}
});

Template.edit.events({
	'click .cancel': function(e) {
		e.preventDefault();
		if ( Session.get('editing') === true ) {
			var blog = document.querySelector('section.blog');

			blog.classList.remove('post');

			Router.go('/blog');
		}
		Session.set('editing', false);
	},
	'blur pre, blur textarea': function(e) {
		var post = Template.currentData() || undefined,
			// fields = document.querySelectorAll('.edit-post form pre'),
			field = e.target,
			fieldName = field.getAttribute('data-name') || field.getAttribute('name'),
			input;

		if ( field.tagName.toLowerCase() === 'pre' ) {
			input = Meteor.utils.smartenQuotes(field.textContent.trim());
			if ( input ) { 
				field.textContent = input;
			}
		} else {
			input = Meteor.utils.smartenQuotes(field.value.trim());
			if ( input ) { 
				field.value = input;
			}
		}
	},
	'keypress pre': function(e) {
		var field = e.target.getAttribute('data-name');

		if ( field === 'title' || field === 'published-date' || field === 'published-time' ) {
			if ( e.keyCode === 13 ) {
				e.preventDefault();
				Session.set('edited', false);
			} else {
				Session.set('edited', true);
			}
		} else {
			Session.set('edited', true);
		}
	},
	'keyup textarea': function(e) {
		input = e.target.value;

		if ( !input ) {
			e.target.style.height = '2.5em';
		} else {
			e.target.style.height = e.target.scrollHeight + 'px';
		}
	},
	'click .add-tag, keydown input.tags': function(e) {
		var field = e.target.value ? e.target : document.querySelector('input.tags'),
			input = field.value;

		if ( e.keyCode === 13 || e.target.tagName === 'A' ) {
			e.preventDefault();

			if ( input ) {
				Meteor.call('addTag', this._id, input);
			}

			field.value = '';
		}
	},
	'click .remove-tag': function(e) {
		e.preventDefault();

		var doc = Template.currentData();

		Meteor.call('removeTag', doc._id, this.valueOf());
	},
	'submit .edit-post': function(e) {
		e.preventDefault();

		// gather all the user input
		var title = document.querySelector('h1 pre'),
			published = document.querySelectorAll('h2 pre'),
			content = e.target.content,
			tags = e.target.tags,
			excerpt = e.target.excerpt,
			tagArr,
			post = this._id ? this : { _id: 'new' },
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
			if ( post._id === 'new' ) {
				input.published = Date.now();
			}
		}

		if ( tags.value ) {
			tagArr = tags.value.split('\n');
			input.tags = tagArr;
		}

		if ( excerpt.value ) {
			input.excerpt = excerpt.value;
		}

		if ( input.title && input.content ) {
			Meteor.call('editPost', post._id, input, function(err, response) {
				if ( err ) {
					console.log(err);
				} else {
					if ( Session.get('editing') === true ) {
						Router.go('/blog/');
					}
					Session.set('editing', false);
				}
			});
		} else {
			Meteor.utils.appendMessages(e.target, '<p><i class="fa fa-exclamation-circle"></i> Title and content are required.</p>');
		}
	}
});