// api:	http://localhost:3000/api?method=getInfo&user=dkoo

Router.route('/api', function() {
	var method = this.request.method,
		query = this.request.query,
		headers = this.request.headers,
		doc,
		result;

	// only return 200 if called with GET and a valid API token
	if ( method === 'GET' ) {
		console.log('API request received. Request headers:');
		console.log(headers);

		if ( query.method ) {
			if ( query.method === 'getInfo' ) {
				if ( query.user ) {
					doc = Meteor.users.findOne({username: query.user});
					result = doc.profile;
					if ( !result ) {
						result = {
							warnings: ['No users found with this name.']
						};
					}
				} else {
					result = {
						warnings: ['Please specify a user with the "user" parameter.']
					};
				}
			} else {
				result = {
					warnings: ['No query or invalid query method.']
				};
			}
		} else {
			result = {
				warnings: ['No query or invalid query method.']
			};
		}

		this.response.statusCode = 200;
		this.response.setHeader("Content-Type", "application/json");
		this.response.setHeader("Access-Control-Allow-Origin", "*");
		this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		this.response.end(JSON.stringify(result));
	} else {
		this.response.statusCode = 401;
		this.response.end('Unauthorized API access.');
	}

}, {where: 'server'});