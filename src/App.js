import React, { useState } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import './App.css';
// import songs from './data/songs.json';
import Navbar from './Navbar/Navbar';
import SongDisplay from './SongDisplay/SongDisplay';
// import AudioPlayer from './AudioPlayer/AudioPlayer';
// require('wavesurfer.js');


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <SongDisplay />
      </Router>
      {/* <AudioPlayer url="https://api.soundcloud.com/tracks/797171077/stream" /> */}

   
    
    </div>
  );
}

export default App;
