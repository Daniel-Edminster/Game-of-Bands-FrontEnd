import React, { Component } from 'react';
import TextInput from '../TextInput/TextInput';
import './SubmitSong.css';
class SubmitSong extends Component {
    constructor() {
        super();

        // let content = 'You must be logged in to do that.';

        // if(this.props.username) this.content = '';
        this.state = {
            content: 'You must be logged in to do that.',
            submitted: false,
            formResponse: ''
        }
    }

    componentDidMount() {
        this.content = 'You must be logged in to do that.';
    }

    handleSongSubmit = (event) => {
        event.preventDefault();
        let url = 'http://127.0.0.1:4000/create';
        // alert(event.target.textContent);

        fetch(url, {
            method: 'post',
            credentials: 'include',
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

        // this.setState({
        //     submitted: true,
            
        // })


    }

    hideSubmittedInfo = () => {
        this.setState({submitted: false});
    }

    renderFormResponse = () => {
        if(this.state.formResponse.errors !== '') {
            // let errs = this.state.formResponse.errors
            let errs = [];

            // for(const err in this.state.formResponse.errors) {
            //     console.log(err);
            //     errs.push (err);
            // }
            // this.state.formResponse.errors.forEach(item => {
            //     errs.push(item.message);
            // })

            console.log(typeof this.state.formResponse.errors)
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

                    <div className="SubmitSong__SubmitInfo__exit" onClick={this.hideSubmittedInfo}><a aria-label="Close Account Info Modal Box">&times;</a></div>

                </div>
            )
        }
        else {
            // return <div className="SubmitSong__SubmitInfo" onClick={this.hideSubmittedInfo}>This is my JSX form response</div>
        }
    }

    render() {
        return (
            <div className="SubmitSong">

                {this.state.submitted === false ? '': this.renderFormResponse()}
                <form action="/submit" method="POST">
                    <h2>Submit a new song</h2>
                    <div className="SubmitSong__Formbox">
                    <TextInput label="Song Name" placeholder="Never Gonna Give You Up" name="songName" />
                    <TextInput label="Song URL" placeholder="https://soundcloud.com/mymixtape" name="songURL" />
                    <TextInput label="Musician" placeholder="Reddit username" name="songMusician" />
                    <TextInput label="Lyricist" placeholder="Reddit username" name="songLyricist" />
                    <TextInput label="Vocalist" placeholder="Reddit username" name="songVocalist" />
                    <TextInput label="Lyrics" type="textarea" placeholder="Twinkle Twinkle Little Star" name="songLyricsheet" />
                    <div>
                    <button className="SubmitSong__Formbox__Button" onClick={this.handleSongSubmit}>Submit</button>
                    </div>
                    </div>

                    {/* <div>{this.state.content}</div> */}
    



                </form>
            </div>
        );
    }
}



export default SubmitSong;