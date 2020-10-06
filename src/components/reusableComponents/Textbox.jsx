import React from 'react';
import PropTypes from 'prop-types';

export default function Textbox(props){
    let wrapperClass='form-group';
    if(props.error.length > 0){
        wrapperClass+=' has-error';
    }
    return(
        <>
        <div className={wrapperClass}>
        <label htmlFor={props.name}>{props.name}</label>
        <div className='field'>
        <input type={props.type} name={props.name} onChange={props.handleChange}/>
        </div>
        {props.error && <div className='alert alert-danger'> {props.error} </div>}
        </div>
        </>
    )
}
Textbox.propTypes={    
    name:PropTypes.string.isRequired,
    onChange:PropTypes.string.isRequired,    
    value:PropTypes.string,
    error:PropTypes.string
}
Textbox.defaultProps={
    error:""
}