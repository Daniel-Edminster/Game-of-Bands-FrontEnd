import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Logo from '../img/GOBLogo-Clean.png';
import './Navbar.css';

class Navbar extends Component {
    constructor(){
        super();


        let userLinkArray = [{
            name: '',
            href: '',
            class: ''
        }];

        this.state = {
            auth: false,
            linkarray: userLinkArray
        };

        let userLinkJSX = '';



    }

    componentDidMount(){
        this.sessionCheck();

        // this.state.auth === true ? this.getUserLinks(true): this.getUserLinks(false);
    

    }

    sessionCheck = () => {
        // let ls = window.localStorage;


        let url = "http://127.0.0.1:4000/sessioncheck";
        fetch(url, { 
                credentials: "include", 
        })
        .then(res => res.json())
        .then(res => {
            console.log("Fetch Response: ", res);
            
            if(res.hasOwnProperty('key') && this.state.auth === false) {
                this.setState({
                    auth: true,
                    username: res.key,
                    access_token: res.tokens.access_token,
                    refresh_token: res.tokens.refresh_token,
                    expiry: res.tokens.expires_at,
                    expirySeconds: res.tokens.expires_in
                });
                this.getUserLinks(true);
                // console.log('getuserlinks true');
                // console.log("state: ", this.state);
            }
            else {
                this.getUserLinks(false);
            }

        });

    
    
    }


    getUserLinks = (auth) => {
        // let JSX;

       
        if(auth === true)
        {

            console.log("getUserLinks", auth);
            this.userLinkArray = [
                { 
                    name: this.state.username,
                    href: `/user/${this.state.username}`,
                    class: 'Navbar__Flexbox__Right__Item'
                },
                {
                    name: 'Admin',
                    href: '/admin',
                    class: 'Navbar__Flexbox__Right__Item'
                },
                {
                    name: 'Submit song',
                    href: '/submitsong',
                    class: 'Navbar__Flexbox__Right__Item__Button'
                },
                {
                    name: 'Logout',
                    href: '/logout',
                    class: 'Navbar__Flexbox__Right__Item'
                }
            ];

            this.setState({
                linkarray: this.userLinkArray
            })


        }
        else {
            this.userLinkArray = [
            { 
                name: 'Login',
                href: '/auth/reddit',
                class: 'Navbar__Flexbox__Right__Item__Button'
            }];

            this.setState({
                linkarray: this.userLinkArray
            })

            // this.userLinkJSX = `<div className="Navbar__Flexbox__Right__Item"><Link to="127.0.0.1:4000/auth/login">Login</Link></div>`;

            // return this.userLinkJSX;

        }
        console.log(this.userLinkJSX);

    }

    renderLinkArray = () => {
        
        return (this.state.linkarray.map((item, i) => {
            return <div key={i} className={item.class}><Link to={item.href}>{item.name}</Link></div>
            // return <div key={i} className="Navbar__Flexbox__Right__Item"><Link to={item.href}>{item.name}</Link></div>
        }));
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
         

                        { console.log(this.state.linkarray) }
                        { this.renderLinkArray()}

                    

                </div>
                
            </div>
        );
    }
}

export default Navbar;