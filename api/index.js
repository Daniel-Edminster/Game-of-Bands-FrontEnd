const express = require("express");
const app = express();
const parser = require("body-parser");
const Song = require("./model/song.model.js");
const fetch = require('node-fetch');
const simpleOAuth2Reddit = require('@jimmycode/simple-oauth2-reddit');

let redis   = require("redis");
let session = require('express-session');
let redisStore = require('connect-redis')(session);
let client  = redis.createClient();



app.use(parser.urlencoded( { extended: true }));
app.use(parser.json());


app.use(function(req, res, next) {
	// res.header("preflightContinue", "true");
	// res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });



app.use(session({
	'secret': 'gameofbandsdev',
	// cookieName: 'gobsession',
	// create new redis store.
	name: '__gameofbandsdev',
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
	resave: false,
	cookie: { 
		secure: false,
		maxAge: 31536000000,
		httpOnly: false
	}
}));

const reddit = simpleOAuth2Reddit.create({
	clientId: 'gUcwwEGm_XOvyQ',
	clientSecret: 'aJtLZjppb7WSRdncLOTIuoQie34',
	callbackURL: 'http://127.0.0.1:4000/auth/reddit/callback',
	state: 'random-unique-string',
	authorizeOptions: {
		duration: 'permanent'
	}
  });


  
  function setUserSession(sessionVars, req, expressResponse) {
	  let baseURL = "https://oauth.reddit.com/api/v1/me";
	  // let rm;
	  const f = fetch(baseURL, {
		  headers: {
			  Authorization: `Bearer ${sessionVars.access_token}`,
			  scope: 'identity'
		  }
	  }).then(res => res.json())
	  .then(res => {

			// req.session.uid = res.name;
			req.session.key = res.name;
			req.session["tokens"] = sessionVars;
			console.log("session key:", req.session.key);
			console.log(res.name, res.link_karma, res.comment_karma);

			// globalsess = req.session;
			  
			// expressResponse.json(req.session);
			req.session.save();

			expressResponse.redirect('http://127.0.0.1:3000/')
			// response.redirect('https://google.com');

	  });
	  // return rm;
  
  
  }

  app.get('/sessioncheck', (req, res) => {
	
	console.log("session id: ", req.session.id);
	res.json(req.session);

  });

  app.post('/sessioncheck', (req, res) => {
	
	console.log("session id: ", req.session.id);
	res.json(req.session);

  });

  // Ask the user to authorize.
  app.get('/auth/reddit', reddit.authorize);
  
  // Exchange the token for the access token.
  app.get('/auth/reddit/callback', reddit.accessToken, (req, res) => {
  
	  let accessToken =  req.token.token.access_token;

	  let sessionVars = req.token.token;
	  // let refreshToken = req.token.token.refresh_token;
	
  
	//   let user = setUserSession(sessionVars, req, res);
	setUserSession(sessionVars, req, res);
  
	//   if(!user) setTimeout(() => {}, 1000);
	  // console.log(typeof user);
	//   console.log('usr', user);
	  // return user;
	//   return res.status(200).json(req.token);
  
  });


/* ***************************
******************************
*************************** */






app.get('/routes', (req, res) => {
	
	const availableRoutes = [

		{
			endpoint: "/all",
			description: "Get all song data at once (not recommended)",
			example: "http://localhost:4000/all"
		},
		{
			endpoint: "/song/:number",
		    description: "Get a specific song's data by numeric index",
			example: "http://localhost:4000/song/467"
		},
		{
			endpoint: "/round/:number",
			description: "Get all songs that were submitted for a specific round",
			example: "http://localhost:4000/round/82"
		},
		{
			endpoint: "/user/:username",
			description: "Get all songs by a specific user, regardless of role",
			example: "http://localhost:4000/user/scottpontiac"
		},
		{
			endpoint: "/user/:username/music",
			description: "Get all songs where the specified user was the musician",
			example: "http://localhost:4000/user/zuthulu/music"
		},
		{
			endpoint: "/user/:username/lyrics",
			description: "Get all songs where the specified user was the lyricist",
			example: "http://localhost:4000/user/Glory2HypnoToad/lyrics"
		},
		{
			endpoint: "/user/:username/vocals",
			description: "Get all songs where the specified user was the vocalist",
			example: "http://localhost:4000/user/pfeifits/vocals"
		},
		{
			endpoint: "/create",
			description: "Create a new song object and add it to the database",
			example: "http://localhost:4000/create",
		},
		{
			endpoint: "/update",
			description: "Update a song object in the database",
			example: "http://localhost:4000/update/5e9875c3abb8a4438c420a27",
		},
		{
			endpoint: "/delete",
			description: "Delete a song object from the database",
			example: "http://localhost:4000/delete/5e9875c3abb8a4438c420a27",
		}
	];

	return res.json(availableRoutes);
});

app.get('/all', (req, res) => {
	Song.find({}).then(songs => {
		res.json(songs);
	});
});

app.get('/all/desc', (req, res) => {
	Song.find().sort({ number: -1 }).then(songs => {
		res.json(songs);
	});
});

app.get('/song/:number', (req, res) => {
	Song.find({ number: req.params.number }).then(song => {
		res.json(song);
	});
});

app.get('/song/id/:id', (req, res) => {
	Song.findOne({ _id: req.params.id }).then(song => {
		res.json(song);
	})
})

app.get('/round/:number', (req, res) => {
	Song.find({ round: req.params.number }).then(round => {
		res.json(round);
	});
});

app.get('/user/:username', (req, res) => {
	Song.find({ 
		$or: [ 
				{ music: req.params.username },
				{ lyrics: req.params.username },
				{ vocals: req.params.username }
			]
	}).then(user => {
		res.json(user);
	});
});


app.get('/user/:username/music', (req, res) => {
	Song.find({ 
		music: req.params.username
	}).then(user => {
		res.json(user);
	});
});

app.get('/user/:username/lyrics', (req, res) => {
	Song.find({ 
		lyrics: req.params.username
	}).then(user => {
		res.json(user);
	});
});

app.get('/user/:username/vocals', (req, res) => {
	Song.find({ 
		vocals: req.params.username
	}).then(user => {
		res.json(user);
	});
});

app.post('/create', (req, res) => {
	console.log('request body:', req.body);

	Song.create(req.body).then(song => {
		console.log(song);
		res.json(song);
	});
});

app.patch('/update/:id', (req, res) => {
	Song.findById(req.params.id, (err, songUpdate) => {

		//_id needs to be immutable, make sure it doesn't get updated
		if(req.body._id) delete req.body._id;
			
		for(let param in req.body) songUpdate[param] = req.body[param];

		songUpdate.save();
		res.json(songUpdate);

	});
});

app.delete('/delete/:id', (req, res) => {
	Song.findById(req.params.id, (err, songUpdate) => {

		if(err) {
			res.status(500).send(err);
		}
		else {

			songUpdate.remove(err => {
				if(err) 
					res.status(500).send(err);
				else {
					let success = {
						response: "Removed from Database"
					};
					res.json(success);
				}
			});

		}
		
	});
});


app.listen(4000, () => console.log("listening on localhost:4000/"));


