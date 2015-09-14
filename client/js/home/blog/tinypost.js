Template.tinypost.helpers({
	excerpt: function() {
		var array = this.content.split(' '),
			excerpt = array.slice(0, 50).join(' ') + '&#160;&#8230;';

		return excerpt;
	}
});