Template.search.onRendered(function() {
	var searchBar = document.querySelector('input.search');
	searchBar.focus();
});

Template.search.events({
	'keydown input.search': function(e) {
		if ( e.keyCode === 27 ) {
			Session.set('searching', false);
		} else {
			Session
		}
	}
});