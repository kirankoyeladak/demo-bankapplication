import React,{useState,useEffect} from 'react';
import Firebase from '../api/config';
export default function FloatNav(){
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
            
    <ul class="list-unstyled components" id="floating-nav">
        
        <li>
            <a href="#"><i class="fas fa-tv"></i></a>
        </li>
        <li>
            <a href="#"><i class="fas fa-credit-card"></i></a>
        </li>
        <li>
            <a href="#"><i class="fas fa-history"></i></a>
        </li>
        <li>
            <a href="#"><i class="fas fa-cog"></i></a>
        </li>
    </ul>
           
        </>
    )
}