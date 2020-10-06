import React, { useState } from 'react';
import Textbox from './reusableComponents/Textbox';
import custid from 'custom-id';
import Firebase from '../api/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from 'react-router-dom';

export default function UserRegistration({createUser,history}){
    const [gender,setGender]=useState('Select');

    const intialValue={
        id:null,
        name:"",
        userid:"",
        password:"",
        confirmPassword:"",
        emailID:"",
        mobileNo:null,
        gender:"",
        userAvatar:"",
        accountBalance:0
    }
    const[user,setUser]=useState(intialValue);    
    const[show,setShow]=useState(false);

    const handleChange=({target})=>{
        console.log('gender',gender);
        setUser({...user,[target.name]:target.value,id:custid({}),accountBalance:10000,gender:gender, userAvatar: gender === 'male' ? './assets/Male.jpg' : './assets/Female.png'});
    }

    const handleSubmit=(event)=>{
        //create        
        console.log('gender',gender);
        event.preventDefault();  
        console.log('user',user);
        let userRef = Firebase.ref('users/' + user.id);
        //userRef.child(user.userid).set(user);
        userRef.set(user);
        setUser({...user,intialValue});        
        toast.success('Data Saved successfully',{
            position:toast.POSITION.BOTTOM_RIGHT
        });
        setShow(true);
        setTimeout(() => {
            history.push('/')
        }, 13000);
    }

    return(
        <>
        <section className="bg-light reg-form">
        <h2>User Registration</h2>
        <form>
        <Textbox name='name' type='text' value={user.name} handleChange={handleChange}/>
        <Textbox name='userid' type='text' value={user.userid} handleChange={handleChange}/>
        <Textbox name='password' type='password' value={user.password} handleChange={handleChange}/>
        <Textbox name='confirmPassword' type='password' value={user.confirmPassword} handleChange={handleChange}/>
        <Textbox name='emailID' type='text' value={user.emailID} handleChange={handleChange}/>
        <Textbox name="mobileNo" type='text' value={user.mobileNo} handleChange={handleChange}/>
        {/* <Textbox name="gender" type='text' value={user.gender} handleChange={handleChange}/> */}
        <label>Gender</label>
        <select value={gender} onChange={(e)=>{
            setGender(e.target.value);
            setUser({...user,gender:e.target.value,
                userAvatar: e.target.value === 'male' ? './assets/Male.jpg' : './assets/Female.png'});            
            
        }} className="custom-select">
            <option value='Select'>Select</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
        </select><br/>
         <button onClick={handleSubmit} className="btn btn-success d-block mx-auto mt-4 shadow-sm">Register</button>
         <button className="btn btn-danger d-block mx-auto mt-4 shadow-sm">Clear</button>
        </form>
        <ToastContainer />
        {show && <>
            <h3>User Registration is success, your otp is {user.id}</h3>
            <p> Please <NavLink to='/login'>login</NavLink> with your credentials </p>
        
        </>
        }
        </section>  
        </>
    )
}