import React from 'react';
import './TextInput.css';

const TextInput = (props) => {
    let label, ph, name, type, propvalue, propfunction;
    if(props.label)  label = props.label;
    if(props.placeholder)  ph = props.placeholder;
    if(props.name)  name = props.name;
    if(props.value) propvalue = props.value;
    if(props.propfunction) propfunction = props.propfunction; 
    props.type == null  ? type="text" : type = props.type;

    if(type !== "textarea") {

        return(
            <div className="TextInput">
            <label>{label}:</label>
            <div>
            <input type={type} placeholder={ph} name={name} className="SubmitSongForm" required value={propvalue} onChange={propfunction} /> 
            </div>
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

export default TextInput;
