import React, { Component } from 'react';
import './SongEditor.css';

class SongEditor extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount() {
        console.log("Song editor initialized");
        // alert("Hi");
    }
    render() {
        // console.log();
        return (
            <div className="SongEditor">
                    Hello
            </div>
        );
    }
}


export default SongEditor;