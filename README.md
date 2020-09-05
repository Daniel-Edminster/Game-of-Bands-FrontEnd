# Game of Bands React Front-End
A React.js based front-end for the GameofBands song database and Express API

# Getting Started

```
git clone https://github.com/Daniel-Edminster/Game-of-Bands-FrontEnd.git
cd Game-of-Bands-FrontEnd
npm install
```
After you've finished setting up the API, you'll have to go through the components and change the API calls to match the URL of your Express server. Sorry I didn't make that process easy, I ran out of time. Once you've done that, to build:
```
npm run build
```
or in a dev environment,
```
npm run start
```
You'll need to login with a reddit account to do anything besides read from the 1500 or so entries here. Once you do, you'll see an `/admin` link in the navbar. From there, you can click the 'X' on a song to delete it, or click the song title to edit some of its database values directly. To create a song, click the `Submit Song` button in the navbar. This has full validation, so worry not about submitting garbage to the database. New songs show up at the very bottom of the song list, this is a byproduct of migrating from sql to mongodb and changing from an integer-based ID to mongoDB's base16 `ObjectID` and not having time to make a mapping function for all that. 


# Contribute

- Source: https://github.com/daniel-edminster/Game-of-Bands-FrontEnd
- Issue Tracker: https://github.com/daniel-edminster/Game-of-Bands-FrontEnd/issues
