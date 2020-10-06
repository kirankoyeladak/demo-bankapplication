import React from 'react';
import Firebase from '../api/config';
import { ToastContainer,toast } from 'react-toastify';
import Textbox from './reusableComponents/Textbox';
import { useState,useEffect } from 'react';
import Navbar from './Layout/Navbar';

export default function Banktransfer({history}){
    const user={
        userid:null,
        balanceAmount:0,
        name:""
    }
    let loggedinUser=JSON.parse(localStorage.getItem('loggedInUser'));
    const [transfer,setTransfer]=useState(user);
    //const [flag, setFlag]=useState(false);

    var ref = Firebase.ref("users");    

    useEffect(() => {
        console.log('loading...');
        ref.orderByChild("id").equalTo('31CI83QU').on("child_added", function(snapshot) {        
            console.log(snapshot.key + " was " + snapshot.val().mobileNo + " meters tall");
            setTransfer({...user,balanceAmount:snapshot.val().accountBalance,name:snapshot.val().name});
            //setTransfer(JSON.stringify(snapshot.val()));
            localStorage.setItem('Transfer',JSON.stringify(snapshot.val()));
          });
      },[]);

    let transferObject=JSON.parse(localStorage.getItem('Transfer'));
    console.log('transfer kiran',transfer);
    //const [source,destination]=useState();
    const [amount, setAmount]=useState(0);
    
    

    console.log('loggedinUser',loggedinUser);
    console.log('transferObject',transfer);
    
    
    function handleTransfer(event){
        event.preventDefault();
        if(loggedinUser && transferObject){
        let userRef = Firebase.ref('users/' + loggedinUser.id);
        let availableAmount=loggedinUser.accountBalance-amount;
        //update balance
        userRef.update({'accountBalance':availableAmount});
        let transferUser=Firebase.ref('users/' + transferObject.id);
        //update balance
        let transferAmount=(Number(transferObject.accountBalance)+Number(amount));
        transferUser.update({'accountBalance':transferAmount});
        console.log('transfer user',transferUser.id);
        toast.success('Money transfer complete');
        getAllUsers();
        setTimeout(() => {
            history.push('/dashboard');
        }, 3000);
        
        }
        
    }

    function getAllUsers(){
        let ref=Firebase.ref('/users');
        ref.on('value',snapshot=>{ 
            localStorage.setItem('AllUsers',JSON.stringify(snapshot.val()));
        });
    }

    function handleChange(event){
        setAmount(event.target.value);
        console.log(amount);
    }
    
    return (
        <>
        <Navbar/>
        <h1>Banktransfer</h1>
        <p>
            User Name:- {loggedinUser.name}
            Availabel Balance:- {loggedinUser.accountBalance}
        </p>
        <p>
            <Textbox name='amount' type='number'value={amount} handleChange={handleChange}/>
            <button className='btn btn-primary' onClick={handleTransfer}>Transfer</button>
        </p>
        <p>
            {
                transfer && 
                <>
                User Name:- {transfer?.name}
                </>
            }
        </p>
        
        <ToastContainer />
        </>
    )
}