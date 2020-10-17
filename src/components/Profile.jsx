import React,{useState,useEffect} from 'react';
import Firebase from '../api/config';
export default function Profile(){
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
            setLoggedUser({...loggedUser,country:snapshot.val().country, accountBalance:(snapshot.val().currentAccount + snapshot.val().savingAccount)});
          });
        
      },[]);
    return(
        <>
            
                <section className="br-10 bg-white shadow-sm mt-4 mt-lg-0">
                    <div className="text-center">
                        <div className="p-3">
                            <img src={loggedInUser.userAvatar} width="90" height="90" className="rounded-circle mb-2" />
                            <h5 className="mb-0">{loggedInUser.name} </h5>
                            <small>{loggedUser.country}<br /> <a href="" className="text-info">User Settings</a></small>
                        </div>
                        <div className="d-flex flex-row border-top border-bottom mt-3">
                            <div className="p-4 text-center w-50 border-right"><b>47</b> <br /><small>Operations</small></div>
                            <div className="p-4 text-center w-50"><b>+{loggedUser.country === 'India' ? '₹' : loggedUser.country === 'USA' ? '$' : loggedUser.country === 'Kuwait' ? 'د.ك' :loggedUser.country === 'Europe' ? '€' : 'Select'} {Number(loggedUser.accountBalance).toFixed(2)} </b><br /><small>Amount</small></div>
                        </div>
                    </div>
                </section>
           
        </>
    )
}