import React from 'react';
import { useState,useEffect } from 'react';
import Firebase from '../api/config';
import { NavLink } from 'react-router-dom';
export default function AccountBalance(){
    var ref = Firebase.ref("users");
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
    const [loggedUser,setLoggedUser]=useState(loggedInUser);

    //get updated balance 
    useEffect(() => {
        console.log('loading...');
        
        ref.orderByChild("id").equalTo(loggedInUser.id).on("child_added", function(snapshot) {        
            console.log(snapshot.key + " was " + snapshot.val().mobileNo + " meters tall");
            //setTheObject(prevState => ({ ...prevState, currentOrNewKey: newValue}));
            //setNames(names => [...names, {id:snapshot.val().id, name:snapshot.val().name,accountBalance:snapshot.val().accountBalance}])
            setLoggedUser(snapshot.val());
          });
        
      },[]);

      console.log('Account Balance ',loggedUser);

    return(
        <>
        <div className="d-flex flex-row">
            <div className="align-self-end">
                <h6><i className="fas fa-arrow-circle-down mr-2 ml-4"></i> My Accounts </h6>
            </div>
            <div class="flex-fill text-right">
                <NavLink to='transfer' className="btn btn-info ml-auto">
                    <i className="fas fa-paper-plane"></i> New Transfer
                </NavLink>
            </div>
        </div>
        <div>
            <div className="container shadow-sm mt-3 bg-white br-10">
                <div class="row p-2">
                    <div className="col-sm-6 p-4 bg-gradient-green br-10">
                        <p className="font-weight-bold text-success m-0">Savings Account</p>55221455665878
                    </div>
                    <div className="col-sm-6 p-md-4">
                        <span class="vertical-align:middle;">Available</span> <span class="vertical-align:middle; display-6"> {loggedUser.country === 'India' ? '₹' : loggedUser.country === 'USA' ? '$' : loggedUser.country === 'Kuwait' ? 'د.ك' : 'Select'}{loggedUser.savingAccount} </span> 
                    </div>
                </div>
            </div>
            <div className="container shadow-sm mt-3 bg-white br-10">
               <div class="row p-2">
                    <div className="col-sm-6 p-4 bg-gradient-red br-10">
                        <p className="font-weight-bold text-success m-0">Current Account</p>55221455665878
                    </div>
                    <div className="col-sm-6 p-md-4">
                        <span class="vertical-align:middle;">Available</span> <span class="vertical-align:middle; display-6"> {loggedUser.country === 'India' ? '₹' : loggedUser.country === 'USA' ? '$' : loggedUser.country === 'Kuwait' ? 'د.ك' : 'Select'}{loggedUser.currentAccount} </span> 
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}