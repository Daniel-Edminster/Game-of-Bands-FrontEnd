import React, { useState, Route, Link } from 'react';
import './App.css';
// import songs from './data/songs.json';
import Navbar from './Navbar/Navbar';
import SongDisplay from './SongDisplay/SongDisplay';
// import AudioPlayer from './AudioPlayer/AudioPlayer';
// require('wavesurfer.js');


function App() {
  return (
    <div className="App">
      <Navbar />
      <SongDisplay />
      {/* <AudioPlayer url="https://api.soundcloud.com/tracks/797171077/stream" /> */}

   
    
    </div>
  );
}

export default App;
