import React from 'react';
import Firebase from '../api/config';
import { ToastContainer,toast } from 'react-toastify';
import Textbox from './reusableComponents/Textbox';
import { useState,useEffect } from 'react';
import Navbar from './Layout/Navbar';
import Sidebar from './Sidebar';
import Autocomplete from 'react-autocomplete';
import {RenderUserInfo} from  './RenderUserInfo';

export default function Banktransfer({history}){

    const userAccountBalance={
        id:"",
        name:"",
        accountBalance:0
    }

    const [xyz,setXyz]=useState({ val: '' });

    const user={
        id:"",
        accountBalance:0,
        name:""
    }

    const [names, setNames]=useState([]);
    let loggedinUser=JSON.parse(localStorage.getItem('loggedInUser'));
    const [transfer,setTransfer]=useState(userAccountBalance);

    const[dest,setDest]=useState(0);
    //const [flag, setFlag]=useState(false);

    var ref = Firebase.ref("users");    

    useEffect(() => {
        
        ref.orderByChild("id").on("child_added", function(snapshot) {        
            //console.log(snapshot.key + " was " + snapshot.val().mobileNo + " meters tall");
            //setTheObject(prevState => ({ ...prevState, currentOrNewKey: newValue}));
            setNames(names => [...names, {id:snapshot.val().id, name:snapshot.val().name,accountBalance:snapshot.val().accountBalance}])
            //setTransfer(JSON.stringify(snapshot.val()));
            //localStorage.setItem('Transfer',JSON.stringify(snapshot.val()));
          });

        // ref.orderByChild("id").equalTo('31CI83QU').on("child_added", function(snapshot) {        
        //     console.log(snapshot.key + " was " + snapshot.val().mobileNo + " meters tall");
        //     setTransfer({...user,balanceAmount:snapshot.val().accountBalance,name:snapshot.val().name});
        //     //setTransfer(JSON.stringify(snapshot.val()));
        //     localStorage.setItem('Transfer',JSON.stringify(snapshot.val()));
        //   });
      },[]);

      // if(names.length>0){
      //   debugger;
      // let loginUser=loggedinUser.id;
      // let index= names.findIndex(x=>x.id === loginUser);
      // if(index>-1){
      //   console.log('removed logedin user ',names.splice(index,1));
      // }
      // }

    //let transferObject=JSON.parse(localStorage.getItem('Transfer'));
    //console.log('bankTransfer',JSON.stringify(names));
    //const [source,destination]=useState();
    const [amount, setAmount]=useState(0);
    
    

    //console.log('loggedinUser',loggedinUser);
    //console.log('transferObject',transfer);
    
    
    function handleTransfer(event){
        event.preventDefault();
        let item=names.find(x=>x.name === xyz.val);
        let user2=names.find(x=>x.id === loggedinUser.id);
        if(loggedinUser && transfer){
        let userRef = Firebase.ref('users/' + loggedinUser.id);
        let availableAmount=user2.accountBalance-amount;
        user2.accountBalance=availableAmount;
        //update balance
        userRef.update({'accountBalance':availableAmount});
        let transferUser=Firebase.ref('users/' + item.id);
        //update balance
        let transferAmount=(Number(item.accountBalance)+Number(amount));
        transferUser.update({'accountBalance':transferAmount});

        //update local storage
        localStorage.setItem('loggedInUser',JSON.stringify(user2));
        toast.success('Money transfer complete');
        setTimeout(() => {
            history.push('/dashboard');
        }, 3000);
      }
    }

    function handleChange(event){
        setAmount(event.target.value);
    }
    
    return (
        <>
         <div class="wrapper">
            <Sidebar/>
            <div id="content">
                <Navbar/>
                <div class="container-fluide px-3 px-md-0 m-4">
                    <div className="dash-transfers shadow-sm">

                        <div class="col-lg-12 py-4 mx-auto">
                            <h2 class=""><i class="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> Transfer</h2>
                            

                            <div className="row mt-4 p-3">
                                <div class="bg-gradient-green b-15-tl p-4 col-lg-6">
                                    <div class="d-flex">
                                        <div class="mr-3 pt-1">
                                        <i class="fas fa-user"></i> Sender : <span class="font-weight-bold">{loggedinUser.name}</span>                                   
                                        </div>
                                         <div class="mr-3">
                                             <select id="inputState" class="form-control">
                                                <option selected>Savings Account</option>
                                                <option>Current Account</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gradient-red b-15-tr p-4 col-lg-6">    
                                    <div class="pt-1">
                                    Availabel Balance <span class="bg-warning px-3 font-weight-bold py-2"><i class="fas fa-dollar-sign"></i> {loggedinUser.accountBalance} </span>
                                     {
                                      (loggedinUser.accountBalance <=0  || amount>loggedinUser.accountBalance)&& <div class='bg-danger position-absolute p-3 text-light'>Insufficent Funds unable to transfer</div>
                                    }

                                    {
                                      amount < 0 && <h5 class='btn btn-danger'>Invalid Amount</h5>
                                    }
                                    </div>
                                 </div>                               

                            </div>

                            <div className="d-flex flex-column flex-lg-row bg-light p-4 mb-5">
                                <div class="mr-2">    
                                    <label class="text-secondary">Transfer To</label>
                                    <div>
                                          <Autocomplete items={names}
                                            disabled={true}
                                            value={xyz.val}
                                            getItemValue={item => item.name}
                                            shouldItemRender={RenderUserInfo}
                                            renderMenu={item => (
                                                <div className="dropdown border p-3 position-absolute bg-white">
                                                  {item}
                                                </div>
                                              )}
                                              renderItem={(item, isHighlighted) =>
                                                <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                                  {item.name}
                                                </div>
                                              }
                                              onChange={(event, val) => {    
                                                setXyz({ val })
                                              } 
                                            }
                                              onSelect={val => {
                                                setXyz({ val })
                                              } 
                                              }
                                            />  
                                    </div>
                                </div>
                                <div class="mr-2">
                                    <label class="text-secondary">Account Type</label>
                                    <div>
                                     <select id="inputState" class="form-control">
                                        <option selected>Savings Account</option>
                                        <option>Current Account</option>
                                    </select>
                                    </div>
                                </div>    
                                <div class="mt-3 mt-md-0">
                                    <label class="text-secondary">Transfer Amount</label>
                                    <div>
                                        <Textbox name='amount' disabled={loggedinUser.accountBalance <=0 }  type='number'value={amount} handleChange={handleChange}/>
                                    </div>
                                </div>
                                <div class="align-self-end mt-3 mt-md-0"> 
                                    <button className='btn btn-info ml-md-2 d-block' disabled={loggedinUser.accountBalance <=0 } onClick={handleTransfer}>Transfer</button>                                  
                                </div>    
                            </div>                                                   
                            {/*
                            <p>
                                {
                                    transfer && 
                                    <>
                                    User Name:- {xyz.val}
                                    </>
                                }
                            </p>*/}    
                        </div>


                    </div>
                </div>    
            </div>          
        </div>     
        <ToastContainer />
        </>
    )
}