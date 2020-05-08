import React, { Component } from 'react';
import '../SubmitSong/SubmitSong.css';
import './SongEditor.css';
import TextInput from '../TextInput/TextInput';
import he from 'he';


class SongEditor extends Component {
    constructor(){
        super();

        this.state = {
            content: 'You must be logged in to do that.',
            submitted: false,
            formResponse: '',
            formValues: {
                name: '',
                url: '',
                music: '',
                lyrics: '',
                vocals: '',
                lyricsheet: '',
                votes: '',
                musicvote: '',
                lyricsvote: '',
                vocalsvote: '',
                number: '0'
            },
            auth: false

        }
    }


    componentDidMount() {
        console.log("Song editor initialized");
        // console.log(this.props);
        // alert("Hi");
        this.sessionCheck();

        this.getSongByID();

    }

    sessionCheck = () => {

        let url = "https://danieledminster.com:8080/sessioncheck";
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

    handleSongSubmit = (event) => {
        event.preventDefault();
        // console.log(event);


        if(this.validURL(this.state.formValues.url))
        {
            let baseURL = 'https://danieledminster.com:8080/update/';
            let id = this.props.match.params.id;
            let fullURL = baseURL+id;
            // alert(event.target.textContent);


            console.log(this.state.formValues);
            console.log(fullURL)
            fetch(fullURL, {
                method: 'PATCH',
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
            .catch(err => { 
                    console.log(err);
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

    getSongByID = () => {
        let id = this.props.match.params.id;
        let baseURL = "https://danieledminster.com:8080/song/id/";
        let fullURL = baseURL+id;

        fetch(fullURL, {
            credentials: 'include',
            method: 'get'
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({
                song: res,
                formValues: res
            })
        })
    }

    handleFormUpdate = (event) => {
        // console.log(event.target.name);
        let {name, value} = event.target;
        let hFUformValues = {};
        // console.log(value);

        for(const [k, v] of Object.entries(this.state.formValues)) { 
            // currentFormValues[k] = v;
            if(k === name) {
                
                k === 'lyricsheet' ? hFUformValues[k] = he.encode(value): hFUformValues[k] = value;
                
            }
            else {
                k === 'lyricsheet' ? hFUformValues[k] = he.encode(v) : hFUformValues[k] = v;
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
            let successResponse = `Song: "${name}" successfully updated for ${music}, ${lyrics}, and ${vocals}.`;
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
        // console.log();

        let formValues = {};
        for(const [key, value] of Object.entries(this.state.formValues)) formValues[key] = value;

        
        if(this.state.auth === true) {
            return (
                <div className="SongEditor">
                        {/* {this.props.match.params} */}
                    
                        {this.state.submitted === false ? '': this.renderFormResponse()}
                        {("song" in this.state ) ? 

                        <>
                        <form action="/edit" method="PATCH">
                        <TextInput name="name" label="Song Name" placeholder={this.state.song.name} propfunction={this.handleFormUpdate} /> 
                        <TextInput name="url" label="URL" placeholder={this.state.song.url} propfunction={this.handleFormUpdate} /> 
                        <TextInput name="music" label="Musician" placeholder={this.state.song.music} propfunction={this.handleFormUpdate} /> 
                        <TextInput name="lyrics" label="Lyricist" placeholder={this.state.song.lyrics} propfunction={this.handleFormUpdate} /> 
                        <TextInput name="lyrics" label="Vocals" placeholder={this.state.song.vocals} propfunction={this.handleFormUpdate} />
                        <TextInput name="lyricsheet" label="Lyricsheet" value={he.decode(this.state.song.lyricsheet)} type="textarea" propfunction={this.handleFormUpdate} />
                        <div className="SongEditor__Votesbox">
                        <TextInput name="votes" label="Track Votes" placeholder={this.state.song.votes} propfunction={this.handleFormUpdate} /> 
                        <TextInput name="musicvote" label="Music Votes" placeholder={this.state.song.musicvote} propfunction={this.handleFormUpdate} /> 
                        <TextInput name="lyricsvote" label="Lyrics Votes" placeholder={this.state.song.lyricsvote} propfunction={this.handleFormUpdate} /> 
                        <TextInput name="vocalsvote" label="Vocals Votes" placeholder={this.state.song.vocalsvote} propfunction={this.handleFormUpdate} />
                    
                        </div>
                        <div className="SongEditor__Submit">
                        <button className="SongEditor__Button" onClick={this.handleSongSubmit}>Submit</button>
                        </div>
                        </form>
                        </>
                        : '' }   

                </div>
            );
        }
        else {
            return (
                <div className="SongEditor"><h3>{this.state.content}</h3></div>
            );
        }
    }
}


export default SongEditor;