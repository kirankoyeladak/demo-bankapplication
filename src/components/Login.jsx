import React, { useState } from 'react';
import Textbox from './reusableComponents/Textbox';
import Firebase from '../api/config';
import { ToastContainer,toast } from 'react-toastify';


export default function Login({history}){
    var ref = Firebase.ref("users");
    const [login,setLogin]=useState({
        userName:'',
        password:'',
        mobileNo:''
    });

    const [OTP,setOTP]=useState({
        value:''
    });

    const handleSubmit=(event)=>{
        event.preventDefault();
        let ref=Firebase.ref('/users');
            ref.on('value',snapshot=>{  
            localStorage.setItem('AllUsers',JSON.stringify(snapshot.val()));
            let data=Object.values(snapshot.val());
            console.log('data',data);
            //get particular user id
            let user=data.find(x=>x.userid ===login.userName && x.password === login.password);
            console.log('find user',user);
                if (user) {
                    console.log('find user', user);
                    if (user && user.userid === login.userName && user.password === login.password) {
                        toast.success('login success');
                        setTimeout(() => {
                            history.push('/')
                        }, 3000);
                        localStorage.setItem('loggedInUser',JSON.stringify(user));
                        localStorage.setItem('username',user.id);                        
                        localStorage.setItem('Balance',user.accountBalance);
                        console.log('local storage',localStorage.getItem('username'));
                    } else {
                        toast.error('Login failed, please try again');
                    }
                }else {
                    toast.error('User not exists');
                }
          });
    }

    const handleLogin=(event)=>{
        event.preventDefault();
        ref.orderByChild("userid").equalTo(login.userName).on("child_added", function(snapshot) {
            if(snapshot.val().userid === login.userName && snapshot.val().password === login.password){
                toast.success('login success');
                setTimeout(() => {
                    history.push('/')
                }, 3000);
                localStorage.setItem('loggedInUser',JSON.stringify(snapshot.val()));
            }else{
                toast.error('Login failed, please try again');
            }
        });
        
    }
      
    const handleChange=({target})=>{
        if(target.name === 'mobileNo' && target.value.length === 10){
            console.log(target.value);
        }
        setLogin({...login,[target.name]:target.value});
    }

    const handleGetOTP=(event)=>{
        //event.preventDefault();
        setOTP({[OTP.value]:"kiran"});
            //get user info
            // var ref = Firebase.ref("users");
            // ref.orderByChild("mobileNo").equalTo(login.mobileNo).on("child_added", function(snapshot) {        
            //     if(snapshot.val()){
            //         setOTP({[OTP.value]:"kiran"});
            //     }
            //   });
              console.log(OTP);
    }
    return (
        <>
        <h1>Login</h1>
        <hr/>
        <form onSubmit={handleLogin}>
        <Textbox name='mobileNo' type='number' value={login?.mobileNo} handleChange={handleChange}/>
        {login.mobileNo.length === 10 && 
        <>
        <button className='btn btn-success' onClick={handleGetOTP}>Get OTP</button> 
        <Textbox name='userName' type='text' value={login?.userName} handleChange={handleChange}/>
        <Textbox name='password' type='password' value={login?.password} handleChange={handleChange}/>
        <button className='btn btn-primary'>Login</button>
        </>
        }   
        </form>
        <ToastContainer />
        </>
    )
}