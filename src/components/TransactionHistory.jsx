import React,{useEffect} from 'react';
import { useState } from 'react';
import Firebase from '../api/config';
export default function TransactionHistory(){
    var ref = Firebase.ref("recentTrans"); 
    const [recentTrans,setRecentTrans]=useState([]);
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
    console.log('logged in user is ',loggedInUser);
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
                
                <td>User Name</td>
                <td>Transfer Amount</td>
                <td>Transfer Status</td>
                <td>Account Type</td>
                <td>Transaction Date</td>
            </tr>
            <tbody>
            
            { recentTrans.length>0 &&
                recentTrans.map((trans,i)=>{
                    return (
                        <tr key={i}>
                <td>{recentTrans[i].username}</td>
                <td>{recentTrans[i].amount}</td>
                <td>{recentTrans[i].status}</td>
                <td>{recentTrans[i].accountType}</td>
                <td>{recentTrans[i].transDate}</td>
                </tr>
                    )
                })
            }
            </tbody>
        </table>
        </>
    )
}