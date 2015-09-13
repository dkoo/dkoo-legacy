// server methods for account login/registration

Meteor.startup(function() {
	// set email environment credentials
	process.env.MAIL_URL = 'smtp://no-reply%40yumhut.com:e^xQnekA@mail.yumhut.com:465';

	Accounts.emailTemplates.siteName = 'dkoo dot net';
	Accounts.emailTemplates.from = 'Myself <d@dkoo.net>';
	Accounts.emailTemplates.enrollAccount.subject = function (user) {
		return 'Confirm dkoo registration';
	};
	Accounts.emailTemplates.enrollAccount.text = function (user, url) {
		return 'Hello, ' + user.username + '. You’re almost done registering for dkoo.net. To activate your account, click the link below:\n\n' + url;
	};
	Accounts.emailTemplates.resetPassword.subject = function (user) {
		return 'Reset dkoo password';
	};
	Accounts.emailTemplates.resetPassword.text = function (user, url) {
		return 'Hi, ' + user.username + '. We’re sending you this e-mail because we received a request to reset your password. If you don’t want to reset your password, just ignore this e-mail. Otherwise, click the link below to reset it:\n\n' + url;
	};
});

Meteor.methods({
	createNewUser: function(user) {
		check(user, Object);

		var validateUser = function(user) {
				var error = '';

				if ( user.email.indexOf('@') === -1 && // email address must contain @
					user.email.indexOf('.') === -1  || // email address must contain .
					user.email.length < 5 ) // email address must be at least 5 characters
				{
					error += user.email ? 'E-mail must be a valid email address.' : 'Please enter a valid e-mail address.';
				}
				if ( !user.username ) {
					error += 'Please enter a username.';
				} else if ( user.username.length < 4 ) {
					error += 'Username must be at least three characters.';
				}

				// if input passes all tests, return true, otherwise return the error messages
				return !error ? true : error;
			},
			valid = validateUser(user);

		if ( valid === true ) {
			var newUser = Accounts.createUser(user);
			return Accounts.sendEnrollmentEmail(newUser);
		} else {
			console.log(valid);
			return false;
		}
	}
});