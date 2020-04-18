const simpleOAuth2Reddit = require('@jimmycode/simple-oauth2-reddit');
const express = require('express');
const fetch = require('node-fetch');

const app = express();



const reddit = simpleOAuth2Reddit.create({
  clientId: 'gUcwwEGm_XOvyQ',
  clientSecret: 'aJtLZjppb7WSRdncLOTIuoQie34',
  callbackURL: 'http://127.0.0.1:4000/auth/reddit/callback',
  state: 'random-unique-string',
  authorizeOptions: {
	  duration: 'permanent'
  }
});

function getUser(token) {
	let baseURL = "https://oauth.reddit.com/api/v1/me";
	// let rm;
	const f = fetch(baseURL, {
		headers: {
			Authorization: `Bearer ${token}`,
			scope: 'identity'
		}
	}).then(res => res.json())
	.then(res => {
		console.log(res.name, res.link_karma, res.comment_karma);
		// res.redirect(200, '/home');

		// rm = res;
		// return rm;
	});
	// return rm;


}
// Ask the user to authorize.
app.get('/auth/reddit', reddit.authorize);

// Exchange the token for the access token.
app.get('/auth/reddit/callback', reddit.accessToken, (req, res) => {

	let accessToken =  req.token.token.access_token;
	// let refreshToken = req.token.token.refresh_token;


	let user = getUser(accessToken);


	if(!user) setTimeout(() => {}, 1000);
	// console.log(typeof user);
	console.log('usr', user);
	// return user;
	return res.status(200).json(req.token);

});

app.listen(4000);
