Meteor.utils = {
	// append messages for admin screens
	appendMessages: function(parent, HTML) {
		var messages = document.getElementById('messages') || document.createElement('div');
		messages.setAttribute('id', 'messages');
		messages.innerHTML = HTML;
		parent.appendChild(messages);
	}
}