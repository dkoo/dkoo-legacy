// startup functions
Meteor.startup(function() {
	Session.set('editing', false);

	document.body.addEventListener('keyup', function(e) {
		if ( e.keyCode === 27 && (!!Session.get('modal') || !!Session.get('viewingProject')) ) {
			if ( Session.get('modal') ) {
				Session.set('modal', undefined);
			}
			if ( Session.get('viewingProject') ) {
				Session.set('viewingProject', undefined);
				Session.set('editingProject', false);
				FlowRouter.go('/projects');
			}
		}
	});
});