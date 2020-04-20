import React, { Component } from 'react';
import '../AdminSongDisplay/AdminSongDisplay';
import './Admin.css';
import AdminSongDisplay from '../AdminSongDisplay/AdminSongDisplay';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SongEditor from '../SongEditor/SongEditor';

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            auth: false
        }
    }
    render() {
        return (
            <div className="AdminContainer">
                <div className="AdminMenuBar">
                   <div className="AdminMenuBar__Header"> Moderator Functions</div>
                <div className="AdminMenuBar__Link">Song List View</div>
                <div className="AdminMenuBar__Link">Round List View</div>
                </div>
                {/* <Router> */}
            <Switch>
            <Route path='/admin' component={AdminSongDisplay} />
            <Route exact path='/admin/edit/:id' render={routerProps => <SongEditor {...routerProps} {...this.state} /> }  />
           

            </Switch>
            {/* </Router> */}
            </div>
        );
    }
}



export default Admin;