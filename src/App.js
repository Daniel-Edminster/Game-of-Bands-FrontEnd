import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
// import songs from './data/songs.json';
import Navbar from './Navbar/Navbar';
import SongDisplay from './SongDisplay/SongDisplay';
import SubmitSong from './SubmitSong/SubmitSong';
// import Admin from './Admin/Admin';
import AdminSongDisplay from './AdminSongDisplay/AdminSongDisplay';
import SongEditor from './SongEditor/SongEditor';
// import AudioPlayer from './AudioPlayer/AudioPlayer';
// require('wavesurfer.js');




class App extends Component {
  constructor() {
      super();

      this.state = {
        auth: false,
        content: 'You must be logged in to do that.'
      }
  }

  componentDidMount(){
    this.sessionCheck();
  }


  sessionCheck = () => {

    let url = "http://127.0.0.1:4000/sessioncheck";
    fetch(url, { 
            credentials: "include", 
    })
    .then(res => res.json())
    .then(res => {
        console.log("Fetch Response: ", res);

        if("key" in res && this.state.auth === false) {
            this.setState({
                auth: true,
                username: res.key,
                access_token: res.tokens.access_token,
                refresh_token: res.tokens.refresh_token,
                expiry: res.tokens.expires_at,
                expirySeconds: res.tokens.expires_in
            });

            this.setState({ auth: true} );
        }
        else {

        }

    });
}



  render() {
      return (
        <div className="App">
          <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"  component={SongDisplay}/>
            <Route exact path="/submitsong"  component={SubmitSong}/>
            
            {/* <Route exact path="/admin"  component={Admin}/> */}
          {/* <SongDisplay /> */}


          {this.state.auth === true ? 
            <Route path="/admin">
            <div className="AdminContainer">
                    <div className="AdminMenuBar">
                      <div className="AdminMenuBar__Header"> Moderator Functions</div>
                    <div className="AdminMenuBar__Link">Song List View</div>
                    <div className="AdminMenuBar__Link">Round List View</div>
                    </div>
              <Switch>
               
                <Route  path="/admin/edit/:id" render={routerProps => <SongEditor {...routerProps} /> }  />
                <Route exact path="/admin" component={AdminSongDisplay} />         
               
              </Switch>          
           
            </div>

            </Route> 
            
            : 
            
            <Route path="/admin">
               {/* <div className="AdminContainer"> */}
              <h3 className="Nope">{this.state.content}</h3>
              {/* </div> */}
               </Route> }



          </Switch>
          </Router>
          {/* <AudioPlayer url="https://api.soundcloud.com/tracks/797171077/stream" /> */}

      
        
        </div>
      );
  }
}

export default App;
