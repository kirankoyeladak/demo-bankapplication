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
                                <div className="">
                                    <h6><i className="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> My Accounts </h6>
                                </div>
                                <div class="flex-fill text-right">
                                    <NavLink to='transfer' className="btn btn-info ml-auto">
                                    <i className="fas fa-paper-plane"></i> New Transfer
                                    </NavLink>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex flex-md-row flex-column shadow-sm mt-4 bg-light br-10">
                                    <div className="pt-4 pl-4 p-md-4 text-secondary"><p className="font-weight-bold text-success m-0">Current Account</p>55221455665878</div>                                    
                                    <div className="pl-4 pb-4 p-md-4 border-left flex-fill text-right"><b>Available</b><br />$ {loggedUser.savingAccount}  </div>
                                </div>

                                <div className="d-flex flex-md-row flex-column shadow-sm mt-4 bg-light br-10">
                                    <div className="pt-4 pl-4 p-md-4 text-secondary"><p className="font-weight-bold text-success m-0">Savings Account</p>55221455665878</div>                                    
                                    <div className="pl-4 pb-4 p-md-4 border-left flex-fill text-right"><b>Available</b><br />$ {loggedUser.currentAccount}</div>
                                </div>
                            </div> 
        </>
    )
}