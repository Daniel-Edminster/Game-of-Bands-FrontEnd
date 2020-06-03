import React, { Component } from 'react';
import './Bandit.css';
// import Songs from '../data/songs.json';
import he from 'he';
import axios from 'axios';
import ReactLoading from 'react-loading';

import { Link } from 'react-router-dom';


class SongDisplay extends Component {
    constructor(){
        super();

        this.state = { 
            Songs: [], 
            loading: true,
            songJSX: ''
        };
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

    getSongList = () => {
        let bandit = this.props.match.params.user;
        console.log('starting song api request');
        axios.get(`https://danieledminster.com:8080/user/${bandit}`)
        .then(res => {
            console.log("bandit songs axios: ", res);
            this.setState({ Songs: res.data }, this.getSongJSX);    
        });
    }

    componentDidMount(){
        console.log('bandit display rendered', this.props);
        this.getSongList();
    }


    getSongJSX = () => {
        let JSX = this.state.Songs.map((song, i) => {

            let trackTrophy = this.convertToTrophy(song.winner);
                    return(

                        <div key={i} className="SongDisplay__Item">
                            
                                            <div className="SongDisplay__Item__PlayIcon" >
                                                <span className="material-icons" 
                                                onClick={this.props.play} 
                                                data-musicSrc={song.streamurl}
                                                data-name={song.name}
                                                data-artists={`${song.music}, ${song.lyrics}, ${song.vocals}`}>
                play_circle_filled
                </span></div>

                <div className="SongDisplay__Item__PlayListAdd"><span className="material-icons">
                playlist_add
                </span></div>
            
                            <div className="SongDisplay__Item__Round">{song.round}</div>
                            <div className="SongDisplay__Item__Name">{he.decode(song.name)}</div>
                            <div className="SongDisplay__Item__TrackWin">
                            {trackTrophy}
                                </div>
                                <div className="SongDisplay__Item__TrackVotes">{song.votes}</div>
                            <div className="SongDisplay__Item__Musician"><Link to={`/bandit/${song.music}`} className="ProfileLink" onClick={this.forceUpdate}>{song.music}</Link></div>
                            <div className="SongDisplay__Item__MusicVotes">{song.musicvote}</div>
                            <div className="SongDisplay__Item__Lyricist"><Link to={`/bandit/${song.lyrics}`} className="ProfileLink" onClick={this.forceUpdate}>{song.lyrics}</Link></div>
                            <div className="SongDisplay__Item__LyricVotes">{song.lyricsvote}</div>
                            <div className="SongDisplay__Item__Vocals"><Link to={`/bandit/${song.vocals}`} className="ProfileLink" onClick={this.forceUpdate}>{song.vocals}</Link></div>
                            <div className="SongDisplay__Item__VocalVotes">{song.vocalsvote}</div>
                            
                            
                            
                        </div>
                    );
            });

            this.setState({ songJSX: JSX });

    }


    render() {

        return (
            
                <>
                {this.state.songJSX === '' ? 
                <div className="MyLoader">
                <ReactLoading type="spin" color="#7c61f7" height={'5%'} width={'5%'} /> 
                </div>
                
                : 
                
                <div className="SongDisplay">
                {this.state.songJSX}
                </div>
                
                }
                </>
                
        );
    }
}

export default SongDisplay;