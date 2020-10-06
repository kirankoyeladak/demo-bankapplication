import React from 'react';

export default function MyButton(props){
    return(
    <input type='button' value={props.buttonText} className='btn btn-primary'/>
    )
}