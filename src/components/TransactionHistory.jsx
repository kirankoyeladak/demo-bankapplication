import React,{useEffect} from 'react';
import { useState } from 'react';
import Firebase from '../api/config';
export default function TransactionHistory(){
    var ref = Firebase.ref("recentTrans"); 
    const [recentTrans,setRecentTrans]=useState([]);
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
    
    useEffect(() => {
        
        ref.orderByChild("id").equalTo(loggedInUser.id).on("child_added", function(snapshot) {        
            setRecentTrans(names => [...names, snapshot.val()]);
          });
      },[]);
      console.log('recentTrans',recentTrans);
    return(
        <>
        <h1>Transaction History</h1>
        <table class="table table-dark" border='1'>
            <tr>
                <td>User ID</td>
                <td>Name</td>
                <td>Current Account</td>
                <td>Saving Account</td>
                <td>Balance Amount</td>
                <td>Transaction Date</td>
            </tr>
            <tbody>
            {
                recentTrans.map((trans,i)=>{
                    return (
                        <tr key={i}>
                <td>{recentTrans[i].id}</td>
                <td>{recentTrans[i].name}</td>
                <td>{recentTrans[i].currentAccount}</td>
                <td>{recentTrans[i].savingAccount}</td>
                <td>{recentTrans[i].accountBalance}</td>
                </tr>
                    )
                })
            }
            </tbody>
        </table>
        </>
    )
}