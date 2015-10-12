Template.modal.helpers({
	'img': function() {
		return Session.get('modal');
	}
});

Template.modal.events({
	'click .modal': function(e) {
		Session.set('modal', undefined);
	},
	'touchmove .modal': function(e) {
		// prevent scrolling in iOS while modal is active
		e.preventDefault();
	}
});