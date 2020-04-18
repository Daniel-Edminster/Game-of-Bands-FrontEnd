import React, { useState, Route, Link } from 'react';
import '../Navbar/Navbar.css';

class UserLink extends Component {
    constructor(){
        super();

        let title = this.props.title;
        let route = this.props.route;
        

    }

    render() {
        return (
            <div className="Navbar__Flexbox__Right__Item">
                <Link to={$route}>{title}</Link>
            </div>
        );
    }
}

export default UserLink;