import React, { Component } from 'react';
import './SongDisplay.css';
// import Songs from '../data/songs.json';

import { Link } from 'react-router-dom';
import he from 'he';
import axios from 'axios';
import ReactLoading from 'react-loading';


class SongDisplay extends Component {
    constructor(){
        super();

        this.state = { 
            Songs: [], 
            loading: true,
            songJSX: []
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
        console.log('starting song api request');
        axios.get('https://danieledminster.com:8080/all/desc')
        .then(res => {
            console.log("songs axios: ", res);
            this.setState({ Songs: res.data }, this.segmentedSongRender);
            // this.setState({ Songs: res.data }, this.getSongJSX);    
        });
    }

    componentDidMount(){
        console.log('song display rendered');
        this.getSongList();
    }

    updateProgress = (i) => {
        let max = this.state.Songs.length;
        // console.log(this.state.Songs.length)
        // let max = 1507;
        // let max = 1500;
        // let progress = ( Math.round((i / max) * 100) );

        if(max - i === 1) this.setState({ loading: false });
        // console.log(progress);
        // if(progress % 0 == 0) console.log(progress);
        // if (progress % 20 === 0 && progress !== this.state.progress && progress !== 0) {
        //     //  this.setState({ progress: progress});
        // }
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
                            <div className="SongDisplay__Item__Musician"><Link to={`/bandit/${song.music}`} className="ProfileLink">{song.music}</Link></div>
                            <div className="SongDisplay__Item__MusicVotes">{song.musicvote}</div>
                            <div className="SongDisplay__Item__Lyricist"><Link to={`/bandit/${song.lyrics}`} className="ProfileLink">{song.lyrics}</Link></div>
                            <div className="SongDisplay__Item__LyricVotes">{song.lyricsvote}</div>
                            <div className="SongDisplay__Item__Vocals"><Link to={`/bandit/${song.vocals}`} className="ProfileLink">{song.vocals}</Link></div>
                            <div className="SongDisplay__Item__VocalVotes">{song.vocalsvote}</div>
                            
                            
                            
                            
                        </div>
                    );
            });

            this.setState({ songJSX: JSX });

    }


    segmentedSongRender = () => {

        let seglength = 25;
        let len = this.state.Songs.length;
        let remainder = len % seglength;
        let cycles = Math.floor(len / seglength);
        let cycleIterator = 0;
        let JSX = '';
        let songArray = [...this.state.Songs];
        console.log(songArray);

        for(let i=0;i<cycles;i++)
        {
            let segment = songArray.splice(0,seglength);
            let current = this.state.songJSX;
            JSX =  segment.map((song, j) => {
                let trackTrophy = this.convertToTrophy(song.winner);
                return(
                    <>
                    <div key={j} className="SongDisplay__Item">
                        
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
                        <div className="SongDisplay__Item__Musician"><Link to={`/bandit/${song.music}`} className="ProfileLink">{song.music}</Link></div>
                        <div className="SongDisplay__Item__MusicVotes">{song.musicvote}</div>
                        <div className="SongDisplay__Item__Lyricist"><Link to={`/bandit/${song.lyrics}`} className="ProfileLink">{song.lyrics}</Link></div>
                        <div className="SongDisplay__Item__LyricVotes">{song.lyricsvote}</div>
                        <div className="SongDisplay__Item__Vocals"><Link to={`/bandit/${song.vocals}`} className="ProfileLink">{song.vocals}</Link></div>
                        <div className="SongDisplay__Item__VocalVotes">{song.vocalsvote}</div>     
                        
                    </div>
                    </>
                );
                
            });
            current.push(JSX);
            this.setState({ songJSX: current });
        }



    }


    render() {

        return (
            
                <>
                {this.state.songJSX.length === 0 ? 
                <div className="MyLoader">
                <ReactLoading type="bars" color="#7c61f7" height={'5%'} width={'5%'} /> 
                </div>
                
                : 
                
                <div className="SongDisplay">
                { this.state.songJSX.map((songlist, i) =>  { return songlist  }) }
                </div>
                 
                } 
                </>
                
        );
    }
}

export default SongDisplay;