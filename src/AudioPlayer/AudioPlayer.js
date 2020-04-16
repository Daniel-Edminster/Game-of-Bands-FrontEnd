
 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer';

require('wavesurfer.js');
 
class AudioPlayer extends Component {
  constructor() {
    super();
 
    
    this.state = {
      playing: false,
      pos: 0
    };
    // this.handleTogglePlay = this.handleTogglePlay.bind(this);
    // this.handlePosChange = this.handlePosChange.bind(this);
  }
  handleTogglePlay = () => {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange = (e) => {
    this.setState({
      pos: e.originalArgs[0]
    });
  }
  render() {
    return (
      <div className="AudioPlayer">
        <Wavesurfer
          audioFile={this.props.url}
          pos={this.state.pos}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
        />
      </div>
      );
  }
}

export default AudioPlayer;