Template.modal.helpers({
	'img': function() {
		return Session.get('modal');
	}
});

Template.modal.events({
	'click .modal, touchstart .modal': function(e) {
		Session.set('modal', undefined);
	}
});