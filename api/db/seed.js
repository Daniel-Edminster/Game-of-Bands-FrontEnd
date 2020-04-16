const songsJSON = require('../songs.json');
const Song = require('../model/song.model.js');


const songMap = songsJSON.map(item => {
	
	const songObject = {
		// _id: item.id,
		number: item.id,
		name: item.name,
		round: item.round,
		url: item.url,
		lyricsheet: item.lyricsheet,
		music: item.music,
		lyrics: item.lyrics,
		vocals: item.vocals,
		votes: item.votes,
		musicvote: item.musicvote,
		lyricsvote: item.lyricsvote,
		vocalsvote: item.vocalsvote,
		musicwin: item.musicwin,
		lyricswin: item.lyricswin,
		vocalswin: item.vocalswin,
		music_agrees: item.music_agrees,
		lyrics_agrees: item.lyrics_agrees,
		vocals_agrees: item.vocals_agrees,
		commercial_terms: item.completed_commercial_terms,
		submitby: item.submitby,
		approved: item.approved,
		streamurl: item.streamurl

	};

	return songObject;

});

Song.deleteMany({})
        .then(() => {
            Song.create(songMap)
            .then(s => console.log(s));
        })
