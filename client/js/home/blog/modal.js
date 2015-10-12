Template.modal.helpers({
	'img': function() {
		return Session.get('modal');
	}
});

Template.modal.events({
	'click .modal': function(e) {
		Session.set('modal', undefined);
	}
});