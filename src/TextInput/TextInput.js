import React, { Component } from 'react';
import './TextInput.css';


class TextInput extends Component {
    constructor(){
        super();
        this.state = {
            filename: 'No file selected.'
        }
    }

    setFileName = (event) => {
        let filename = event.target.value.replace(/^.*\\/, "");
        this.props.propfunction(event);
        this.setState({
            filename: filename
        })
    }

    render() {
        let label, ph, name, type, propvalue, propfunction;
        if(this.props.label)  label = this.props.label;
        if(this.props.placeholder)  ph = this.props.placeholder;
        if(this.props.name)  name = this.props.name;
        if(this.props.value) propvalue = this.props.value;
        if(this.props.propfunction) propfunction = this.props.propfunction; 
        this.props.type == null  ? type="text" : type = this.props.type;

        if(type !== "textarea" && type !== "file") {

            return(
                <div className="TextInput">
                <label>{label}:</label>
                <div>
                <input type={type} placeholder={ph} name={name} className="SubmitSongForm" required value={propvalue} onChange={propfunction} /> 
                </div>
                </div>
            );
        }
        else if(type === "file") {
            return(
                <div className="TextInput">
                <label>{label}:</label>
                <div>
                <input accept="audio/*" type={type} name={name} className="SubmitSongForm__FileInput" required onChange={this.setFileName} /> 
                
                </div>
                <label className="TextInput__FileLabel">{this.state.filename}</label>
                </div>
            );
        }
        else {
            return(
                <div className="TextInput">
                <label>{label}:</label>
                <div>
                <textarea name={name} className="SubmitSongForm" placeholder={ph} required onChange={propfunction}>{propvalue}</textarea> 
                </div>
                </div>
            );
        }
    }
}

export default TextInput;
