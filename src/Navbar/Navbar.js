import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import Logo from '../img/GOBLogo-Clean.png';
import './Navbar.css';

class Navbar extends Component {
    constructor(){
        super();


        let userLinkArray = [{
            name: 'Login',
            href: 'https://danieledminster.com:8080/auth/reddit',
            class: 'Navbar__Flexbox__Right__Item__Button'
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


        let url = "https://danieledminster.com:8080/sessioncheck";
        fetch(url, { 
                credentials: "include",
                method: 'GET' 
        })
        .then(res => res.json())
        .then(res => {
            console.log("Fetch Response: ", res);

            // https://www.reddit.com/api/v1/access_token

            // if("tokens" in res)
            
            if("key" in res && this.state.auth === false) {
                this.setState({
                    auth: true,
                    username: res.key,
                    access_token: res.tokens.access_token,
                    refresh_token: res.tokens.refresh_token,
                    expiry: res.tokens.expires_at,
                    expirySeconds: res.tokens.expires_in
                });
                this.getUserLinks(true);
                // console.log('true');
                // console.log('getuserlinks true');
                // console.log("state: ", this.state);
            }
            else {
                this.getUserLinks(false);
                // console.log('false');
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
                href: 'https://danieledminster.com:8080/auth/reddit',
                class: 'Navbar__Flexbox__Right__Item__Button'
            }];

            this.setState({
                linkarray: this.userLinkArray
            })

            // this.userLinkJSX = `<div className="Navbar__Flexbox__Right__Item"><Link to="127.0.0.1:4000/auth/login">Login</Link></div>`;

            // return this.userLinkJSX;

        }
        // console.log(this.userLinkJSX);

    }

    logoutOverride = (event) => {
        event.preventDefault();
        this.delete_cookie("__gameofbandsdev");
        this.sessionCheck();
        this.setState({ auth: false });
        window.location="/";
    

    }
    
    delete_cookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
    renderLinkArray = () => {
        
        return (this.state.linkarray.map((item, i) => {
            if(item.name === 'Login') 
                return <div key={i} className={item.class}><a href={item.href}>{item.name}</a></div>
            else if(item.name === 'Logout') 
                return <div key={i} className={item.class}><a href={item.href} onClick={this.logoutOverride}>{item.name}</a></div>
            else 
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
                    <Link to="/">Songs</Link>
                    </div>

                    <div className="Navbar__Flexbox__Left__Item">
                    <a href="https://reddit.com/r/gameofbands" target="_blank">/r/gameofbands</a>
                    </div>

                    <div className="Navbar__Flexbox__Left__Item">
                    <a href="https://discordapp.com/invite/h7ywF3">Discord</a>
                    </div>
        
                </div>

                <div className="Navbar__Flexbox__Right">
         

                        {/* { console.log(this.state.linkarray) } */}
                        { this.renderLinkArray()}

                    

                </div>
                
            </div>
        );
    }
}

export default Navbar;