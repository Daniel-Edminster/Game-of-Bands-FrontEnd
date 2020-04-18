import React, { Component } from 'react';
import Logo from '../img/GOBLogo-Clean.png';
import './Navbar.css';

class Navbar extends Component {
    constructor(){
        super();

        // if(this.props) {
        //     let leftLinks = this.props.leftLinks;
        //     let rightLinks = this.props.rightLinks;
        // }

        this.state = {
            auth: false
        };

        let userLinkArray = '';
        let sessionVars = '';
        let checkNum = 0;

    }


    
    sessionCheck = () => {

        console.log(document.cookie);
        let url = "http://127.0.0.1:4000/sessioncheck";
            fetch(url, { 
                credentials: "include", 
            // method: 'post' 
        })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    // if(!(res.auth === false)) {
                    //     this.setState( { auth: true });
                    //     this.sessionVars = res;
                    //     // console.log(this.sessionVars);
                    // }
                    // checkNum++;

                });
            
    }

    getUserLinks = () => {
        let JSX;
        if(this.state.auth === true)
        {
            
        } else {

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
                    <a href="https://reddit.com/r/gameofbands" target="_blank">/r/gameofbands</a>
                    </div>

                    <div className="Navbar__Flexbox__Left__Item">
                    <a href="https://discordapp.com/invite/h7ywF3">Discord</a>
                    </div>
        
                </div>

                <div className="Navbar__Flexbox__Right">
                {this.sessionCheck()}

                {/* <div className="Navbar__Flexbox__Right__Item">
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
                    </div> */}

                    <div className="Navbar__Flexbox__Right__Item">
                        <a href="http://localhost:4000/auth/reddit" className="Navbar__Flexbox__Right__Item__Button">Login</a>
                    </div>

                </div>
                
            </div>
        );
    }
}

export default Navbar;