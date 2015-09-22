Template.search.onRendered(function() {
	var searchBar = document.querySelector('input.search');

	searchBar.focus();
});

Template.search.helpers({
	query: function() {
		return Session.get('filter');
	}
});

Template.search.events({
	'keydown input.search': function(e) {
		if ( e.keyCode === 27 ) {
			Session.set('searching', false);
		} else if ( e.keyCode === 13 ) {
			e.target.blur();
		}
	},
	'keyup input.search': function(e) {
		var searchTerm = e.target.value,
			now = Session.get('now') || Date.now();

		if ( searchTerm.length > 0 ) {
			Session.set('filter', searchTerm);
		} else {
			Session.set('filter', '');
		}
	},
	'click a.close': function(e) {
		e.preventDefault();

		Session.set('searching', false);
		Session.set('filter', '');
		Router.go('/blog');
	}
});