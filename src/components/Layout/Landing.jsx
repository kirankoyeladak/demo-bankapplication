import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Landing(){
    return(
        <>
        <h1>Banking Application</h1>
        <hr/>
        <NavLink to='login' className="d-block mx-auto mt-4 shadow-sm">Login</NavLink>
        <NavLink to='register' className="d-block mx-auto mt-4 shadow-sm">Register</NavLink>
        </>
    )
}