define({ "api": [
  {
    "type": "get",
    "url": "/all",
    "title": "Request all song data.",
    "name": "GetAllSongs",
    "group": "User",
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/all/desc",
    "title": "Request all song data (reverse chronological)",
    "name": "GetAllSongsRecemt",
    "group": "User",
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/song/:number",
    "title": "Get all of a song's data by its numeric index.",
    "name": "GetSingleSongData",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "Song-index",
            "description": "<p>Unique song index</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/round/:number",
    "title": "Request all songs from a specific round",
    "name": "GetSongsByRound",
    "group": "User",
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:username",
    "title": "Request all songs by a specific user",
    "name": "GetSongsByUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Reddit Username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:username/music",
    "title": "Request all songs where a specific user is the musician role",
    "name": "GetSongsByUserMusic",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Reddit Username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:username/lyrics",
    "title": "Request all songs where a specific user is the lyricist role",
    "name": "GetSongsbyUserLyrics",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Reddit Username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:username/vocals",
    "title": "Request all songs where a specific user is the vocalist role",
    "name": "GetSongsbyUserVocals",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Reddit Username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/create",
    "title": "Add a new song to the database",
    "name": "createSong",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Song Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Song URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "music",
            "description": "<p>Song Musician</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lyrics",
            "description": "<p>Song Lyricist</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vocals",
            "description": "<p>Song Vocalist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n  \"name\": \"Never Gonna Give You Up\",\n  \"url\": \"https://www.youtube.com/watch?v=dQw4w9WgXcQ\",\n  \"music\": \"Noah\",\n  \"lyrics\": \"Roger\",\n  \"vocals\": \"RickAstley\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/update/:id",
    "title": "Update an existing song by id",
    "name": "createSpmg",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Song Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Song URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "music",
            "description": "<p>Song Musician</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lyrics",
            "description": "<p>Song Lyricist</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vocals",
            "description": "<p>Song Vocalist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n  \"name\": \"Never Gonna Let You  Down\",\n  \"url\": \"https://www.youtube.com/watch?v=dQw4w9WgXcQ\",\n  \"music\": \"RickAstley\",\n  \"lyrics\": \"RickAstley\",\n  \"vocals\": \"RickAstley\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/delete/:id",
    "title": "Delete an existing song by id",
    "name": "deleteSong",
    "group": "User",
    "version": "0.0.0",
    "filename": "api/documentation.js",
    "groupTitle": "User"
  }
] });
