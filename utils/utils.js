Meteor.utils = {
	// identify the correct transitionend event for the current browser
	getTransitionEndEvent: function () {
		var t,
			el = document.documentElement,
			transitions = {
				'transition':'transitionend',
				'OTransition':'oTransitionEnd',
				'MozTransition':'transitionend',
				'WebkitTransition':'webkitTransitionEnd'
			};

		for ( t in transitions ) {
			if( el.style[t] !== undefined ) {
				return transitions[t];
			}
		}
	},
	// append messages for admin screens
	appendMessages: function(parent, HTML) {
		var messages = document.getElementById('messages') || document.createElement('div');
		messages.setAttribute('id', 'messages');
		messages.innerHTML = HTML;
		parent.appendChild(messages);
	},
	prettifyDate: function(dateString) {
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		// Create an array with the current month, day and time
		var date = [ dateString.getMonth() + 1, dateString.getDate(), dateString.getFullYear() ];

		// Create an array with the current hour, minute and second
		var time = [ dateString.getHours(), dateString.getMinutes() ];

		// Determine AM or PM suffix based on the hour
		var suffix = ( time[0] < 12 ) ? 'AM' : 'PM';

		// Convert hour from military time
		time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

		// If hour is 0, set it to 12
		time[0] = time[0] || 12;

		// If seconds and minutes are less than 10, add a zero
		for ( var i = 1; i < 3; i++ ) {
			if ( time[i] < 10 ) {
				time[i] = '0' + time[i];
			}
		}

		return [days[dateString.getDay()], date.join('/'), time.join(':') + ' ' + suffix];
	},
	getUTC: function(prettifiedDate, prettifiedTime) {
		var date = prettifiedDate.split('/'),
			timeStr = prettifiedTime.toLowerCase() || '12:00 am',
			time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i),
			newDate;

		// attempt to parse the date and time strings. expected formats:
		// date: MM/DD/YYYY
		// time: 9am, 9:00AM, 9:00 am will all work
		// if date is not given, return false
		// if time is not given, set it to midnight
		if ( date.length === 3 && time ) {
			var hour = parseInt(time[1], 10) || 12,
				minute = parseInt(time[2]) || 0;

			if ( hour == 12 && !time[3] ) {
				hour = 0;
			}
			else {
				hour += (hour < 12 && time[3]) ? 12 : 0;
			}

			newDate = new Date(parseInt(date[2]), parseInt(date[0]) - 1, parseInt(date[1]), hour, minute);
			return newDate.getTime();
		} else {
			// if we can't parse the date and time, return false
			return false;
		}
	},
	makeSlug: function(title) {
		var arr = title.split(' '),
			slug = [];

		for ( var i = 0, len = arr.length; i !== len; i++ ) {
			if ( arr[i] ) {
				slug.push(arr[i].replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ').toLowerCase());
			}
		}

		return slug.join('-');
	},
	smartenQuotes: function(text) {
		return text
			.replace(/'''/g, '\u2034')													// triple prime
			.replace(/(\W|^)"(\S)/g, '$1\u201c$2')										// beginning "
			.replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')			// ending "
			.replace(/([^0-9])"/g,'$1\u201d')											// remaining " at end of word
			.replace(/''/g, '\u2033')													// double prime
			.replace(/(\W|^)'(\S)/g, '$1\u2018$2')										// beginning '
			.replace(/([a-z])'([a-z])/ig, '$1\u2019$2')									// conjunction's possession
			.replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')				// ending '
			.replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')	// abbrev. years like '93
			.replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019')	// backwards apostrophe
			.replace(/'/g, '\u2032');
	}
}