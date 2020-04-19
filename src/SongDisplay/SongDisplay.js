import React, { Component } from 'react';
import './SongDisplay.css';
import Songs from '../data/songs.json';
import he from 'he';

class SongDisplay extends Component {
    constructor(){
        super();

        this.state = {};
    }

    convertToTrophy = number => {
        if(number == null) {
            return "";
        } 
        else if (parseInt(number) === 1)
        {
            return <span className="material-icons">emoji_events</span>
        }

    }
    render() {

        return (
            <div className="SongDisplay">
            
                {Songs.reverse().map((song, i) => {

                    let trackTrophy = this.convertToTrophy(song.winner);
                    return(

                        <div key={i} className="SongDisplay__Item">
                            
                                            <div className="SongDisplay__Item__PlayIcon"><span className="material-icons">
                play_circle_filled
                </span></div>

                <div className="SongDisplay__Item__PlayListAdd"><span className="material-icons">
                playlist_add
                </span></div>
              
                            <div className="SongDisplay__Item__Round">{song.round}</div>
                            <div className="SongDisplay__Item__Name">{he.decode(song.name)}</div>
                            <div className="SongDisplay__Item__TrackWin">
                            {trackTrophy}
        
                                {/* {song.winner} */}
                                </div>
                            <div className="SongDisplay__Item__TrackVotes">{song.votes}</div>
                            <div className="SongDisplay__Item__Musician">{song.music}</div>
                            <div className="SongDisplay__Item__MusicVotes">{song.musicvote}</div>
                            <div className="SongDisplay__Item__Lyricist">{song.lyrics}</div>
                            <div className="SongDisplay__Item__LyricVotes">{song.lyricsvote}</div>
                            <div className="SongDisplay__Item__Vocals">{song.vocals}</div>
                            <div className="SongDisplay__Item__VocalVotes">{song.vocalsvote}</div>
                            
                            
                            
                            
                        </div>
                    );
                })}
                
            </div>
        );
    }
}

export default SongDisplay;