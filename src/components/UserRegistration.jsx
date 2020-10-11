import React, { useState } from 'react';
import Textbox from './reusableComponents/Textbox';
import custid from 'custom-id';
import Firebase from '../api/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from 'react-router-dom';

export default function UserRegistration({createUser,history}){
    const [gender,setGender]=useState('Select');
    const [country,setCountry]=useState('Select');

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
        accountBalance:0,
        country:""
    }
    const[user,setUser]=useState(intialValue);    
    const[show,setShow]=useState(false);

    const handleChange=({target})=>{
        console.log('gender',gender);
        setUser({...user,[target.name]:target.value,id:custid({}),accountBalance:10000,currentAccount:10000,savingAccount:5000,gender:gender, userAvatar: gender === 'male' ? './assets/Male.jpg' : './assets/Female.png',country:country});
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
        <div id="register" className="container-fluid">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-12 col-lg-6 py-5">

                <div className="d-block brand">
                    <i className="fas fa-university"></i>
                    <h5 className="m-0">Bank Application</h5>
                    <small><b>Electronic Payment System</b></small>
                </div>

        <section className="bg-light reg-form shadow">
        <h3 class="m-5 bb-green d-block pb-3"><i class="fas fa-user-tie"></i> User Registration</h3>
        
         <form class="col-lg-10"> 
            <div class="d-flex flex-row">
                <label>Name</label>
                <div class="flex-fill"><Textbox name='name' type='text' value={user.name} handleChange={handleChange}/>
                </div>
            </div>

            <div class="d-flex flex-row">
                <label>User Id</label>
                <div class="flex-fill"><Textbox name='userid' type='text' value={user.userid} handleChange={handleChange}/></div>
            </div>
                
            <div class="d-flex flex-row">
                <label>Password</label>
                <div class="flex-fill"><Textbox name='password' type='password' value={user.password} handleChange={handleChange}/></div>
            </div>

            <div class="d-flex flex-row">
                <label>Confirm Password</label>
                <div class="flex-fill"><Textbox name='confirmPassword' type='password' value={user.confirmPassword} handleChange={handleChange}/></div>
            </div>

            <div class="d-flex flex-row">
                <label>Email Id</label>
                <div class="flex-fill"><Textbox name='emailID' type='text' value={user.emailID} handleChange={handleChange}/></div>
            </div>

            <div class="d-flex flex-row">
                <label>Mobile</label>
                <div class="flex-fill"><Textbox name="mobileNo" type='text' value={user.mobileNo} handleChange={handleChange}/></div>
            </div>

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
        <label>Country</label>
        <select value={country} onChange={(e)=>{
            console.log('country',e.target.value);
            setCountry(e.target.value);
            setUser({...user,country:e.target.value});
            
        }} className="custom-select">
            <option value='Select'>Select</option>
            <option value='India'>India</option>
            <option value='USA'>USA</option>
            <option value='Kuwait'>Kuwait</option>
        </select><br/>
         <div class="text-right">
             <button onClick={handleSubmit} className="btn btn-info d-inline-block mt-4 mr-2 shadow-sm">Register</button>
             <button className="btn btn-danger d-inline-block mt-4 shadow-sm">Clear</button>
        </div>
        </form>
        <ToastContainer />
        {show && <>
            <h3>User Registration is success, your otp is {user.id}</h3>
            <p> Please <NavLink to='/login' className="text-info">login</NavLink> with your credentials </p>
        
        </>
        }
                </section>

            </div>
        </div>  
    </div>   
        </>
    )
}