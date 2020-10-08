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
            setLoggedUser({...loggedUser,accountBalance:(snapshot.val().currentAccount + snapshot.val().savingAccount)});
          });
        
      },[]);
    return(
        <>
            
                <section className="br-10 bg-light shadow-sm">
                    <div className="text-center">
                        <div className="p-3">
                            <img src={loggedInUser.userAvatar} width="70" className="rounded-circle mb-2" />
                            <h5 className="mb-0">{loggedInUser.name} </h5>
                            <small>New York City - USA<br /> <a href="" className="text-info">User Settings</a></small>
                        </div>
                        <div className="d-flex flex-row border-top border-bottom mt-3">
                            <div className="p-4 text-center w-50 border-right"><b>47</b> <br /><small>Operations</small></div>
                            <div className="p-4"><b>+$ {loggedUser.accountBalance} </b><br /><small>Amount</small></div>
                        </div>
                    </div>
                </section>
           
        </>
    )
}