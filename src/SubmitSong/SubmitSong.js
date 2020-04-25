import React, { Component } from 'react';
import TextInput from '../TextInput/TextInput';
import './SubmitSong.css';
import axios from 'axios';
import e from 'cors';
class SubmitSong extends Component {
    constructor() {
        super();

        // let content = 'You must be logged in to do that.';

        // if(this.props.username) this.content = '';
        this.state = {
            content: 'You must be logged in to do that.',
            submitted: false,
            formResponse: '',
            formPlaceholders: {
                name: 'Never Gonna Give You Up',
                url: 'https://soundcloud.com/doomgrip776/rick-astley-never-gonna-give-you-up-airhorn-remix',
                music: 'BedroomProducer',
                lyrics: 'DistinguishedWriter',
                vocals: 'AntiVoxxer',
                lyricsheet: 'I wrote you but you still ain\'t callin\''
            },
            formValues: {
                name: '',
                url: '',
                music: '',
                lyrics: '',
                vocals: '',
                lyricsheet: ''
            },
            auth: false

        }

       
    }

    componentDidMount() {
        this.sessionCheck();
        // this.content = 'You must be logged in to do that.';
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

    validURL = (str) => {
        //https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

    handleSongSubmit = (event) => {
        event.preventDefault();
        // console.log(event);


        if(this.validURL(this.state.formValues.url))
        {
            let url = 'http://127.0.0.1:4000/create';
            // alert(event.target.textContent);

            console.log(this.state.formValues);

            fetch(url, {
                method: 'post',
                credentials: 'include',
                body: JSON.stringify(this.state.formValues),
                headers: {
                    'Content-type': 'application/json'
                }

            }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    submitted: true,
                    formResponse: res
                })
            })
        }
        else {
            this.setState({
                submitted: true,
                formResponse: {
                    errors: {
                        url: {
                            message: 'Invalid Song URL'
                        }
                    }
                }
            })
        }

    }

    handleFormUpdate = (event) => {
        // console.log(event.target.name);
        let {name, value} = event.target;
        let hFUformValues = {};
        // console.log(value);

        for(const [k, v] of Object.entries(this.state.formValues)) { 
            // currentFormValues[k] = v;
            if(k === name) {
                hFUformValues[k] = value;
            }
            else {
                hFUformValues[k] = v;
            }
        }

        this.setState({
            formValues: hFUformValues
        }, this.logState);

    }

    logState = () => {
        console.log(this.state.formValues);
    }

    hideSubmittedInfo = () => {
        this.setState({submitted: false});
    }

    renderFormResponse = () => {
        let errkey = "errors";
        if((errkey in this.state.formResponse)) {
            // let errs = this.state.formResponse.errors
            let errs = [];


            // console.log(typeof this.state.formResponse.errors)
            Object.keys(this.state.formResponse.errors).forEach(key => {
                errs.push(this.state.formResponse.errors[key].message);
            })


            return ( 
                <div className="SubmitSong__SubmitInfo" >
                    <div className="SubmitSong__SubmitInfo__List">
                    <ul>

                        { errs.map((item, i) => {
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                    </div>

                    <div className="SubmitSong__SubmitInfo__exit" onClick={this.hideSubmittedInfo}><a aria-label="Close Error Notification Box">&times;</a></div>

                </div>
            )
        }
        else {


            let { name, music, lyrics, vocals} = this.state.formResponse;
            let successResponse = `Song: "${name}" successfully submitted for ${music}, ${lyrics}, and ${vocals}.`;
            return ( 
            
          <div className="SubmitSong__SubmitSuccess" >
              <div className="SubmitSong__SubmitSuccess__Message">
                  { successResponse }
            </div>

            <div className="SubmitSong__SubmitInfo__exit" onClick={this.hideSubmittedInfo}><a aria-label="Close Success Notification Box">&times;</a></div>

        </div>

            );

            // return <div className="SubmitSong__SubmitInfo" onClick={this.hideSubmittedInfo}>This is my JSX form response</div>
        }
    }

    render() {



        let placeholders = {};
        let formValues = {};
        for(const [key, value] of Object.entries(this.state.formPlaceholders)) placeholders[key] = value;
        for(const [key, value] of Object.entries(this.state.formValues)) formValues[key] = value;
        
        if(this.state.auth === true) {
            return (
                <div className="SubmitSong">


                    {this.state.submitted === false ? '': this.renderFormResponse()}
                    <form action="/submit" method="POST">
                        <h2>Submit a new song</h2>
                        <div className="SubmitSong__Formbox">
                        <TextInput label="Song Name" placeholder={placeholders.name} name="name" value={formValues.name} propfunction={this.handleFormUpdate} />
                        <TextInput label="Song URL" type="url" placeholder={placeholders.url} name="url" value={formValues.url} propfunction={this.handleFormUpdate}/>
                        <TextInput label="Musician" placeholder={placeholders.music} name="music" value={formValues.music} propfunction={this.handleFormUpdate}/>
                        <TextInput label="Lyricist" placeholder={placeholders.lyrics} name="lyrics" value={formValues.lyrics} propfunction={this.handleFormUpdate}/>
                        <TextInput label="Vocalist" placeholder={placeholders.vocals} name="vocals" value={formValues.vocals} propfunction={this.handleFormUpdate}/>
                        <TextInput label="Lyrics" type="textarea" placeholder={placeholders.lyricsheet} name="lyricsheet" value={formValues.lyricsheet} propfunction={this.handleFormUpdate}/>
                        <div>
                        <button className="SubmitSong__Formbox__Button" onClick={this.handleSongSubmit}>Submit</button>
                        </div>
                        </div>

                        {/* <div>{this.state.content}</div> */}
        



                    </form>
                
        
                </div>
            );
        } 
        
        else {
            return (
            <div className="SubmitSong">
                <h4>{this.state.content}</h4>
            </div>
        )

        } 
    }
}



export default SubmitSong;