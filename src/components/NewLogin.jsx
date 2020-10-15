import React,{ useState } from 'react';
import Textbox from './reusableComponents/Textbox';
import Firebase from '../api/config';
import { ToastContainer,toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

export default function NewLogin({history}){
    var ref = Firebase.ref("users");
    const [login,setLogin]=useState({        
        userName:'',
        password:'',
        mobileNo:''
    });

    const [OTP,setOTP]=useState({
        value:''
    });
    const handleChange=({target})=>{
        // if(target.name === 'mobileNo' && target.value.length === 10){
        //     console.log(target.value);
        // }
        setLogin({...login,[target.name]:target.value});
    }

    const handleLogin=(event)=>{
        event.preventDefault();
        console.log('user state',login);
        ref.orderByChild("userid").equalTo(login.userName).on("child_added", function(snapshot) {
            console.log('user',snapshot.val());
            if((snapshot.val().userid === login.userName && snapshot.val().password === login.password) || (snapshot.val().userid === login.userName && snapshot.val().id === login.password)){
                toast.success('login success');
                setTimeout(() => {
                    history.push('/dashboard')
                }, 1000);
                localStorage.setItem('loggedInUser',JSON.stringify(snapshot.val()));
            }else{
                toast.error('Login failed, please try again');
            }
        });

    }

    return(
    <>
    <div id="login" className="container-fluid">
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-5">

                <div className="d-block brand">
                    <i className="fas fa-university"></i>
                    <h5 className="m-0">Bank Application</h5>
                    <small><b>Electronic Payment System</b></small>
                </div>
                <div>
                        <form onSubmit={handleLogin} className="shadow">
                          <div className="container">
                            <Textbox type='text' placeholder='Enter UserID' name='userName' value={login?.userName} handleChange={handleChange}/> 
                             <i className="fa fa-user icon input-icon"></i>
                             <Textbox type='password' placeholder='Enter Password' name='password' value={login?.password} handleChange={handleChange}/>
                             <i className="fa fa-lock icon input-icon-pwd"></i>
                            <button type="submit" className="btn btn-info d-block mx-auto mt-4 shadow-sm">Log In</button>                                               
                          </div>

                          <div className="container text-center mt-4">            
                            <span>Forgot <a href="#" className="text-info">password?</a></span> |  
                            <span>
                                <NavLink className="text-info" to='/register'>Register</NavLink>
                            </span>
                          </div>
                        </form>
                        <ToastContainer />
                </div>
                <footer>
                    To create an account download App
                </footer>

            </div>
        </div>  
    </div>
    </>
    )
}