import React from 'react';
import PropTypes from 'prop-types';

export default function Textbox(props){
    let wrapperClass='form-group';
    if(props.error.length > 0){
        wrapperClass+=' has-error';
    }
    return(
        <>        
        {/*<label htmlFor={props.name}>{props.name}</label>*/}        
        <input type={props.type} disabled={props.disabled} name={props.name} onChange={props.handleChange}/>
       {props.error && <div className='alert alert-danger'> {props.error} </div>}      
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