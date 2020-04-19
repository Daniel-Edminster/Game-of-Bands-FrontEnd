import React from 'react';
import './TextInput.css';

const TextInput = (props) => {
    let label, ph, name, type;
    if(props.label)  label = props.label;
    if(props.placeholder)  ph = props.placeholder;
    if(props.name)  name = props.name;
    props.type == null  ? type="text" : type = props.type;

    if(type !== "textarea") {

        return(
            <div className="TextInput">
            <label>{label}:</label>
            <div>
            <input type={type} placeholder={ph} name={name} className="SubmitSongForm" required /> 
            </div>
            </div>
        );
    }
    else {
        return(
            <div className="TextInput">
            <label>{label}:</label>
            <div>
            <textarea name={name} className="SubmitSongForm" placeholder={ph} required></textarea> 
            </div>
            </div>
        );
    }
}

export default TextInput;
