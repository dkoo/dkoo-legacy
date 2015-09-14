Template.edit.onRendered(function() {
	Session.set('edited', false);
	var post = Session.get('editing'),
		data = Template.currentData() || undefined;

	if ( data ) {
		var fields = document.getElementsByTagName('pre'),
			field;

		for ( var i = 0, len = fields.length; i !== len; i++ ) {
			field = fields[i].getAttribute('data-name');

			if ( field === 'published' ) {
				fields[i].textContent = Meteor.utils.prettifyDate(data[field]);
			} else {
				fields[i].textContent = data[field];
			}
		}
	}
});

Template.edit.helpers({
	newPost: function() {
		return Session.get('edit-post') === 'new' ? true : false;
	},
	edited: function() {
		return Session.get('edited');
	}
});

Template.edit.events({
	'click .cancel': function(e) {
		e.preventDefault();
		Session.set('editing', false);
	},
	'focus h2 pre': function(e) {
		e.target.textContent = '';
	},
	'blur pre': function(e) {
		var post = Template.currentData() || undefined,
			// fields = document.querySelectorAll('.edit-post form pre'),
			field = e.target,
			fieldName = field.getAttribute('data-name'),
			input = Meteor.utils.smartenQuotes(field.textContent.trim());

		if ( input && fieldName !== 'content' ) {
			field.textContent = input;
		} else {
			if ( post && fieldName === 'published' ) {
				field.textContent = Meteor.utils.prettifyDate(post.published);
			}
		}
	},
	'keypress pre': function(e) {
		var field = e.target.getAttribute('data-name');

		if ( field === 'title' ) {
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
	'submit .edit-post': function(e) {
		e.preventDefault();

		var title = document.querySelector('h1 pre'),
			published = document.querySelector('h2 pre'),
			content = document.querySelector('section.content pre'),
			post = this || undefined,
			input = {
				title: title.textContent.trim(),
				content: Meteor.utils.deDiv(content.textContent.trim())
			};

		if ( Session.get('edit-post') === 'new' ) {
			input.published = new Date();
		}

		console.log(input.content);

		// Meteor.call('editPost', post._id, input, function(err, response) {
		// 	if ( err ) {
		// 		console.log(err);
		// 	} else {
		// 		Session.set('editing', false);
		// 	}
		// });
	}
});