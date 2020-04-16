import React, { Component } from 'react';
import Logo from '../img/GOBLogo-Clean.png';
import './Navbar.css';

class Navbar extends Component {
    constructor(){
        super();

        if(this.props) {
            let leftLinks = this.props.leftLinks;
            let rightLinks = this.props.rightLinks;
        }
    }
    render() {
        return (
            <div className="Navbar">
                <div className="Navbar__Flexbox__Left">
                    <div className="Navbar__Flexbox__Left__Brand">
                        <img src={Logo} alt="Game of Bands Logo." className="Navbar__Flexbox__Left__Brand__img" />
                    </div>

                    <div className="Navbar__Flexbox__Left__Item">
                        <a href="#">Rounds</a>
                    </div>

                    <div className="Navbar__Flexbox__Left__Item">
                    <a href="#">Songs</a>
                    </div>

                    <div className="Navbar__Flexbox__Left__Item">
                    <a href="#">/r/gameofbands</a>
                    </div>

                    <div className="Navbar__Flexbox__Left__Item">
                    <a href="#">Discord</a>
                    </div>
        
                </div>

                <div className="Navbar__Flexbox__Right">
                <div className="Navbar__Flexbox__Right__Item">
                        Username
                    </div>
                <div className="Navbar__Flexbox__Right__Item">
                        Edit Profile
                    </div>
                <div className="Navbar__Flexbox__Right__Item">
                        Admin
                    </div>
                    <div className="Navbar__Flexbox__Right__Item">
                        <a href="#" className="Navbar__Flexbox__Right__Item__Button">Submit Song</a>
                    </div>
                    <div className="Navbar__Flexbox__Right__Item">
                        Logout
                    </div>


                </div>
                
            </div>
        );
    }
}

export default Navbar;