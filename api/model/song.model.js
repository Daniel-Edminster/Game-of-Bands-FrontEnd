const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
	// _id: Number,
	number: Number,
	name: {
		type: String,
		required: [true, 'Song name is required']
	},
	round: Number,
	url: {
		type: String,
		required: [true, 'Song url is required']
	},
	lyricsheet: String,
	music: {
		type: String,
		required: [true, 'Song musician is required']
	},
	lyrics: {
		type: String,
		required: [true, 'Song lyricist is required']
	},
	vocals: {
		type: String,
		required: [true, 'Song vocalist is required']
	},
	votes: {
		type: Number,
		default: 0
	},
	musicvote: {
		type: Number,
		default: 0
	},
	lyricsvote: {
		type: Number,
		default: 0
	},
	vocalsvote: {
		type: Number,
		default: 0
	},
	musicwin: {
		type: Boolean,
		default: false
	},
	lyricswin: {
		type: Boolean,
		default: false
	},
	vocalswin: {
		type: Boolean,
		default: false
	},
	music_agrees: {
		type: Boolean,
		default: false
	},
	lyrics_agrees: {
		type: Boolean,
		default: false
	},
	vocals_agrees: {
		type: Boolean,
		default: false
	},
	commercial_terms: {
		type: Boolean,
		default: false
	},
	submitby: String,
	approved: {
		type: Boolean,
		default: false
	},
	//Soundcloud api links
	streamurl: String
});

module.exports = mongoose.model('Song', SongSchema);
