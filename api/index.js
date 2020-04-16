const express = require("express");
const app = express();
const parser = require("body-parser");
const Song = require("./model/song.model.js");

app.use(parser.urlencoded( { extended: true }));
app.use(parser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

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


