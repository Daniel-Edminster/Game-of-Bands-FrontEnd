import React, { Component } from 'react';
import he from 'he';
import './AdminSongDisplay.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SongEditor from '../SongEditor/SongEditor';
import ReactLoading from 'react-loading';
import { BASE_URL } from '../constants';

class AdminSongDisplay extends Component {
    constructor(){
        super();

        this.state = {
            auth: false,
            // songs: ''
        }

        // let notifClassList = ' ';

    }

    componentDidMount() {
        let url = `${BASE_URL}/all/desc`;
        fetch(url)
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            this.setState({
                songs: res
            })
        })

    }

    deleteSong = (event) => {
        let songID = event.target.getAttribute("data-id");

        if(window.confirm("Are you sure you want to delete this song?")) {
            let url = `${BASE_URL}/delete/${songID}`;
            fetch(url, { 
                method: 'DELETE',
                credentials: 'include'
             
            }).then(res => res.json())
            .then(res => {
                // lsongsArray = this.state.songs;

                // const index = songsArray.indexOf(songID);


                let songsArray = this.state.songs;
                let index = -1;
                for(let i=0;i<songsArray.length;i++) {
                    if(songsArray[i]._id === songID) {
                        index = i;
                        break;
                    }
                }

                songsArray.splice(index, 1);
                this.setState({
                    songs: songsArray,
                    deletedSong: true,
                    jsonResponse: res.response
                });
            })

            // console.log("songarray", songsArray)
            // const index = songsArray.indexOf(songID);
            // console.log(index);
        }
    }

    showDeletedResponse() {

            return (
                <div className="AdminSongDisplay__MessageSuccess">
                    <div className="AdminSongDisplay__MessageSuccess__Message">{this.state.jsonResponse}</div><div className="AdminSongDisplay__MessageSuccess__X"><a onClick={this.hideNotification} aria-label="Close Success Notification Box">&times;</a></div>
                </div>
            );

    }

    hideNotification = () => {
        // this.showDeletedResponse(' leaving');
        this.setState({deletedSong: false});
    }

    render() {
        
        // console.log(this.state.songs);
        return (
            <div className="AdminSongDisplayContainer">

        { this.state.deletedSong === true ? this.showDeletedResponse() : '' }

            {/* {this.state.songs.map((item, i) => {
                return <div className="AdminSongDisplay__Item"></div>
            })} */}

            <div className="AdminSongDisplay__Titlebar">
                <div className="AdminSongDisplay__Titlebar__Round">#</div>
                <div className="AdminSongDisplay__Titlebar__Name">Name</div>
                <div className="AdminSongDisplay__Titlebar__Musician">Musician</div>
                <div className="AdminSongDisplay__Titlebar__Lyricist">Lyricist</div>
                <div className="AdminSongDisplay__Titlebar__Vocalist">Vocalist</div>
                <div className="AdminSongDisplay__Titlebar__Vote">T</div>
                <div className="AdminSongDisplay__Titlebar__Vote">M</div>
                <div className="AdminSongDisplay__Titlebar__Vote">L</div>
                <div className="AdminSongDisplay__Titlebar__Vote">V</div>
                <div className="AdminSongDisplay__Titlebar__Delete">Delete</div>
                

            </div>
            {
                ("songs" in this.state ) ?  this.state.songs.map((item, i) => { 
                    return ( 
                        <div key={i} className="AdminSongDisplay__Item">
                            <div className="AdminSongDisplay__Item__Round">{item.round}</div>
                            <div className="AdminSongDisplay__Item__Name"><Link to={`/admin/edit/${item._id}`}>{he.decode(item.name)}</Link></div>
                            <div className="AdminSongDisplay__Item__Musician">{item.music}</div>
                            <div className="AdminSongDisplay__Item__Lyricist">{item.lyrics}</div>
                            <div className="AdminSongDisplay__Item__Vocalist">{item.vocals}</div>
                            <div className="AdminSongDisplay__Item__Vote">{item.votes}</div>
                            <div className="AdminSongDisplay__Item__Vote">{item.musicvote}</div>
                            <div className="AdminSongDisplay__Item__Vote">{item.lyricsvote}</div>
                            <div className="AdminSongDisplay__Item__Vote">{item.vocalsvote}</div>
                            <div className="AdminSongDisplay__Item__Delete"><a aria-label="Close Success Notification Box" data-id={item._id} onClick={this.deleteSong}>X</a></div>
                        </div> )
                }) :                 
                
                <div className="MyLoader">
                <ReactLoading type="spin" color="#7c61f7" height={'5%'} width={'5%'} /> 
                </div>
            }
                
            </div>
        );
    }
}


export default AdminSongDisplay;