import React, { Component } from 'react';
import TextInput from '../TextInput/TextInput';
import './SubmitSong.css';
import axios from 'axios';
// import e from 'cors';

// import Autocomplete from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

import he from 'he';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import { BASE_URL } from '../constants';


class SubmitSong extends Component {
    constructor() {
        super();

        let postURL =  `${BASE_URL}/create`;

        this.state = {
            content: 'You must be logged in to do that.',
            postURL: postURL, 
            submitted: false,
            formResponse: '',
            formPlaceholders: {
                name: 'Never Gonna Give You Up',
                url: 'https://soundcloud.com/doomgrip776/rick-astley-never-gonna-give-you-up-airhorn-remix',
                music: 'A musician',
                lyrics: 'A lyricist',
                vocals: 'A vocals person',
                lyricsheet: 'I wrote you but you still ain\'t callin\''
            },
            formValues: {
                name: '',
                // url: '',
                music: '',
                lyrics: '',
                vocals: '',
                lyricsheet: '',
                song: ''
            },
            auth: false,
            uploading: false,
            progressText: 'Uploading...',
            formClass: '',
            users: [],
            user1NF: false,
            user2NF: false,
            user3NF: false

        }

       
    }

    componentDidMount() {
        this.sessionCheck();
        this.getAutoCompleteUsers();
        // this.content = 'You must be logged in to do that.';
    }

    getAutoCompleteUsers = () => {
        let url = "https://danieledminster.com:8080/users";
        axios({
            url: url,
            method: 'GET',
            withCredentials: true
        }).then(res => {
            this.setState({ users: res.data });
        }).catch(err => console.log(err));

    }

    toggleUser1 = () => {
        this.setState({ user1NF: !this.state.user1NF });
    };

    sessionCheck = () => {
        // let ls = window.localStorage;


        let url = `${BASE_URL}/sessioncheck`;
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

    
    setTypeUserAutocomplete = (event) => {
        let typedUser = event.target.value;
        console.log(event.target);
        let users = this.state.users;
        users.push(typedUser);
        this.setState({ users: users});
    }

    handleSongSubmit = (event) => {
        event.preventDefault();
        // console.log(event);

        if(this.state.formValues.song) {



            let { name, music, lyrics, vocals, lyricsheet, song } = this.state.formValues;


            if(name === '' || music === '' || lyrics === '' || vocals === '' || lyricsheet === '')
            {
                    this.setState({
                        submitted: true,
                        formResponse: {
                            errors: [{
                                'message': 'All fields are required.'
                            }]
                        }
                    }, this.renderFormResponse);

                    return;
            }
            
            console.log(this.state.formValues);
            let songPostData = new FormData();
            songPostData.append('name', name);
            songPostData.append('music', music);
            songPostData.append('lyrics', lyrics);
            songPostData.append('vocals', vocals);
            songPostData.append('lyricsheet', he.encode(lyricsheet));
            songPostData.append('song', song);
            // songPostData.append(Object.keys(this.state.formValues), [this.state.formValues]);

            // console.log('submit: ', songPostData.entries());
            for (let pair of songPostData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            // songPostData.append('name')
            this.setState({uploading: true, formClass: 'veil' });
            axios({
                url: this.state.postURL,
                method: 'POST',
                // withCredentials: true,
                data: songPostData,
                onUploadProgress: (ProgressEvent) => {
                    let percentage = Math.round( (ProgressEvent.loaded * 100) / ProgressEvent.total );
                    if(this.state.progress >= 99) this.setState({ progressText: 'Converting...'});
                    this.setState({ progress: percentage }, this.logPercent)
                }
            }).then(res => {
                this.setState({uploading: false, submitted: true, formResponse: res, progressText: 'Uploading...', progress: 0, formClass: '' });
                console.log(res)
                // console.log(res.data)
            })
            .catch(err => console.log(err))

        }
        else {
            this.setState({
                submitted: true,
                formResponse: {
                    errors: [{
                        'message': 'Song file is required.'
                    }]
                }
            }, this.renderFormResponse);
        }

        // if(this.validURL(this.state.formValues.url))
        // {
        //     let url = 'https://danieledminster.com:8080/create';
        //     // alert(event.target.textContent);

        //     console.log(this.state.formValues);

        //     fetch(url, {
        //         method: 'post',
        //         credentials: 'include',
        //         body: JSON.stringify(this.state.formValues),
        //         headers: {
        //             'Content-type': 'application/json'
        //         }

        //     }).then(res => res.json())
        //     .then(res => {
        //         console.log(res);
        //         this.setState({
        //             submitted: true,
        //             formResponse: res
        //         })
        //     })
        // }
        // else {
        //     this.setState({
        //         submitted: true,
        //         formResponse: {
        //             errors: {
        //                 url: {
        //                     message: 'Invalid Song URL'
        //                 }
        //             }
        //         }
        //     })
        // }

    }

    logPercent = () => console.log(this.state.progress);

    // handleFormUpdate = (event) => {
    //     // console.log(event.target.name);
      
    //     let {name, value} = event.target;
    //     let file = '';
    //     event.target.files === null ? file = '': file=event.target.files[0];

    //     let hFUformValues = {};
    //     // console.log(value);

    //     for(const [k, v] of Object.entries(this.state.formValues)) { 
    //         // currentFormValues[k] = v;
    //         if(k === name && name !== 'song') {
    //             hFUformValues[k] = value;
    //         }
    //         else if(k === name && name === 'song') {
    //             hFUformValues[k] = file;
    //         }
    //         else {
    //             hFUformValues[k] = v;
    //         }
    //     }

    //     this.setState({
    //         formValues: hFUformValues
    //     }, this.logState);

    // }

    setFormMusician = event => {
        let formValues = this.state.formValues;
        formValues.music = event.target.value;
        this.setState({
            formValues: formValues
        })
    }

    setFormLyricist = event => {
        let formValues = this.state.formValues;
        formValues.lyrics = event.target.value;
        this.setState({
            formValues: formValues
        })
    }

    setFormVocals = event => {
        let formValues = this.state.formValues;
        formValues.vocals = event.target.value;
        this.setState({
            formValues: formValues
        })
    }

    setFormLyricsheet = event => {
        let formValues = this.state.formValues;
        formValues.lyricsheet = event.target.value;
        this.setState({
            formValues: formValues
        })
    }

    setFormSongFile = event => {
        let formValues = this.state.formValues;
        formValues.song = event.target.files[0];
        this.setState({
            formValues: formValues
        }) 
    }

    setFormSongName = event => {
        let formValues = this.state.formValues;
        formValues.name = event.target.value;
        this.setState({
            formValues: formValues
        }) 
    }

    logState = () => {
        console.log(this.state.formValues);
    }

    hideSubmittedInfo = () => {
        this.setState({submitted: false});
    }

    renderFormResponse = () => {
        console.log('render form response');
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


            let { name, music, lyrics, vocals} = this.state.formResponse.data;
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
                    {this.state.uploading === true ? 
                        <div className="UploadProgress">
                            {this.state.progressText}
                        <ProgressBar percent={this.state.progress} 
                        filledBackground="linear-gradient(to right, #ff3019 ,#cf0404)" 
                        unfilledBackground="rgba(0,0,0,0)" >
                      </ProgressBar>
                      </div>

                    : '' }
                        <h2>Submit a new song</h2>
                        <div className={"SubmitSong__Formbox " + this.state.formClass}>
                        <TextInput label="Song Name" placeholder={placeholders.name} name="name" val={formValues.name} propfunction={this.setFormSongName} />
                        {/* <TextInput label="Song URL" type="url" placeholder={placeholders.url} name="url" value={formValues.url} propfunction={this.handleFormUpdate}/> */}

                        {/* {/* <TextInput label="Song file" placeholder="My Greatest hit.mp3" name="song" type="file" propfunction={this.setFormSongFile} /> */}
                        {/* <TextInput label="Musician" placeholder={placeholders.music} name="music" val={formValues.music} propfunction={this.setFormMusician}/>
                        <TextInput label="Lyricist" placeholder={placeholders.lyrics} name="lyrics" val={formValues.lyrics} propfunction={this.setFormLyricist}/>
                        <TextInput label="Vocalist" placeholder={placeholders.vocals} name="vocals" val={formValues.vocals} propfunction={this.setFormVocals}/> */}

                        <br /><br />

                        <div className="UserFormFlex">

                        {this.state.user1NF === false ? 
                        <Autocomplete
                        id="combo-box-demo"
                        options={this.state.users}
                        getOptionLabel={(option) => option}
                        style={{ width: 500 }} 
                        // fullWidth={true}
                        renderInput={(params) => <TextField {...params} label="Select a user" variant="filled" onchange={this.setTypeUserAutocomplete} />} />

                        : 
                            <TextField style={{ width: 500 }}  label="Enter a user" variant="filled" />
                        }
                        
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={this.state.user1InDB}
                                onChange={this.toggleUser1}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Not Found?"
                        />
                        </div>

                        <TextInput label="Lyrics" type="textarea" placeholder={placeholders.lyricsheet} name="lyricsheet" val={formValues.lyricsheet} propfunction={this.setFormLyricsheet}/>
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