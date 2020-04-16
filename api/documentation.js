/**
 * @api {get} /all Request all song data.
 * @apiName GetAllSongs
 * @apiGroup User
 *
 */

 /**
 * @api {get} /all/desc Request all song data (reverse chronological)
 * @apiName GetAllSongsRecemt
 * @apiGroup User
 *
 *
 */

 
 /**
 * @api {get} /round/:number Request all songs from a specific round
 * @apiName GetSongsByRound
 * @apiGroup User
 *
 */


 /**
 * @api {get} /user/:username Request all songs by a specific user
 * @apiName GetSongsByUser
 * @apiGroup User
 *
 * @apiParam {String} username Reddit Username
 *
 */

  /**
 * @api {get} /user/:username/music  Request all songs where a specific user is the musician role 
 * @apiName GetSongsByUserMusic
 * @apiGroup User
 *
 * @apiParam {String} username Reddit Username
 *
 */

/**
 * @api {get} /user/:username/lyrics Request all songs where a specific user is the lyricist role
 * @apiName GetSongsbyUserLyrics
 * @apiGroup User
 *
 * @apiParam {String} username Reddit Username
 *
 */

    /**
 * @api {get} /user/:username/vocals Request all songs where a specific user is the vocalist role
 * @apiName GetSongsbyUserVocals
 * @apiGroup User
 *
 * @apiParam {String} username Reddit Username
 *
 */

 /**
 * @api {get} /song/:number Get all of a song's data by its numeric index.
 * @apiName GetSingleSongData
 * @apiGroup User
 *
 * @apiParam {Integer} Song-index Unique song index
 */

  /**
 * @api {get} /song/id/:id Get all of a song's data by its ObjectID
 * @apiName GetSingleSongDataByID
 * @apiGroup User
 *
 * @apiParam {String} ObjectID Unique ObjectID
 */


  /**
 * @api {post} /create Add a new song to the database
 * @apiName createSong
 * @apiGroup User
 *
 * @apiParam {String} name Song Name
 * @apiParam {String} url Song URL
 * @apiParam {String} music Song Musician
 * @apiParam {String} lyrics Song Lyricist
 * @apiParam {String} vocals Song Vocalist
 * 
 * @apiParamExample {json} Request-Example:
 *              { 
 *                "name": "Never Gonna Give You Up",
 *                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
 *                "music": "Noah",
 *                "lyrics": "Roger",
 *                "vocals": "RickAstley"
 *              }
 * 
 */

   /**
 * @api {patch} /update/:id Update an existing song by id
 * @apiName createSong
 * @apiGroup User
 *
 * @apiParam {String} name Song Name
 * @apiParam {String} url Song URL
 * @apiParam {String} music Song Musician
 * @apiParam {String} lyrics Song Lyricist
 * @apiParam {String} vocals Song Vocalist
 * 
 * @apiParamExample {json} Request-Example:
 *              { 
 *                "name": "Never Gonna Let You  Down",
 *                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
 *                "music": "RickAstley",
 *                "lyrics": "RickAstley",
 *                "vocals": "RickAstley"
 *              }
 * 
 * 
 */

 
/** 
 * @api {delete} /delete/:id Delete an existing song by id
 * @apiName deleteSong
 * @apiGroup User
 * 
 * 
 */