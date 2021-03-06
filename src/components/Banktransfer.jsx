import React from 'react';
import Firebase from '../api/config';
import { ToastContainer,toast } from 'react-toastify';
import Textbox from './reusableComponents/Textbox';
import { useState,useEffect } from 'react';
import Navbar from './Layout/Navbar';
import Sidebar from './Sidebar';
import FloatNav from './FloatNav';
import Autocomplete from 'react-autocomplete';
import {RenderUserInfo} from  './RenderUserInfo';
import custid from 'custom-id';
import {currencyvalues} from '../api/currencyvalues';

export default function Banktransfer({history}){
    let receiverUserCurrency='';
    let signUser=JSON.parse(localStorage.getItem('loggedInUser'));
    const [currency,setCurrency]=useState();
    const [orginCurrency,setOrginCurrency]=useState();
    const initRecentTrans={
        id:"",
        accType:"",
        availableBalance:0,
        FinalBalance:0
    }
    

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

    const acccUser={
        accType:"",
        amount:""
    }

    const [showError,setShowError]=useState(false);

    const [accBalance,setAccBalance]=useState(initRecentTrans);

    const [sendUserInfo,setSendUserInfo]=useState(acccUser);
    const[receiveUserInfo,setReceiveUserInfo]=useState();

    const [names, setNames]=useState([]);
    
    let loggedinUser=JSON.parse(localStorage.getItem('loggedInUser'));
    const [transfer,setTransfer]=useState(userAccountBalance);

    const[dest,setDest]=useState(0);
    //const [flag, setFlag]=useState(false);

    var ref = Firebase.ref("users");    

    useEffect(() => {
        console.log('currencyvalues ',currencyvalues);
        ref.orderByChild("id").on("child_added", function(snapshot) {        
            setNames(names => [...names, {id:snapshot.val().id,userid:snapshot.val().userid, name:snapshot.val().name,accountBalance:snapshot.val().accountBalance,savingAccount:snapshot.val().savingAccount, currentAccount:snapshot.val().currentAccount,country:snapshot.val().country}])
          });
      },[]);

    
    const [amount, setAmount]=useState(0);
    
    //get particular user
    let user2=names.find(x=>x.id === loggedinUser.id);
    
    function handleTransfer(event){
        event.preventDefault();
        //receiver
        let item=names.find(x=>x.name === xyz.val);
        //sender
        let user2=names.find(x=>x.id === loggedinUser.id);

        console.log('setSendUserInfo ',sendUserInfo);
        console.log('Receiver user info ',receiveUserInfo);
        
        if(loggedinUser && receiveUserInfo){
        let userRef = Firebase.ref('users/' + loggedinUser.id);
        let availableAmount=sendUserInfo.amount -amount;
        user2.accountBalance=availableAmount;
        
        //update balance basedon account type
        if(sendUserInfo?.accType !== "Select" && receiveUserInfo?.accType !== "Select"){
            sendUserInfo.accType === "Current Account" ? (   
                userRef.update({'currentAccount':availableAmount})
            ) : (
                userRef.update({'savingAccount':availableAmount})
            );
            let item=names.find(x=>x.name === xyz.val);
            let transferUser=Firebase.ref('users/' + item.id);

            //currency convertion
                 //sender
         let user2=names.find(x=>x.id === loggedinUser.id);
         let countryCurrency=user2.country === 'India' ? 'inr' : loggedinUser.country === 'USA' ? 'usd' : loggedinUser.country === 'Europe' ? 'euro'  :  'kwd';
         let baseCurrency=countryCurrency;
         let findCurrency=currencyvalues.find(x=>x.id === countryCurrency);
         let senderCountryCurrency=loggedinUser.country === 'India' ? 'inr' : loggedinUser.country === 'USA' ? 'usd' : loggedinUser.country === 'Europe' ? 'euro' :  'kwd';
         //receiver
         let receiverCountryCurrencyCode=item.country === 'India' ? 'inr' : item.country === 'USA' ? 'usd' : item.country === 'Europe' ? 'euro'  :  'kwd';
         let receiverCountryCurrency=item.country === 'India' ? 'inr' : item.country === 'USA' ? 'usd' : item.country === 'Europe' ? 'euro'  :  'kwd';
         
         let currencyCalAmount=CalculateAmount(baseCurrency,senderCountryCurrency,receiverCountryCurrencyCode,amount,findCurrency);
        //end of currency convertion

            if(receiveUserInfo?.accType === "Current Account")  {
                let transferAmount=(Number(item.currentAccount)+Number(currencyCalAmount));
                transferUser.update({'currentAccount':transferAmount});    
            }

            if(receiveUserInfo?.accType === "Savings Account"){
                let transferAmount=(Number(item.savingAccount)+Number(currencyCalAmount));
                transferUser.update({'savingAccount':transferAmount});    
            }
            //update transaction history
            transHistory(item.userid,amount,"Success",sendUserInfo.accType);
            console.log('item ',item);
            //update local storage
            localStorage.setItem('loggedInUser',JSON.stringify(user2));
        }
        
        toast.success('Money transfer complete');
        setTimeout(() => {
            history.push('/dashboard');
        }, 3000);
    }        
    }

    function CalculateAmount(userbaseCurrency,fromCurrency,toCurrency,amount,currencyList){
        let finallist=Object.values(currencyList);
        let rates=finallist.slice(1,finallist.length);
        let convertedAmount=0;
        debugger;
        //calculate currency
        if(userbaseCurrency === 'inr'){
            convertedAmount=calculateINRCurrency(fromCurrency,toCurrency,amount);
        }

        if(userbaseCurrency === 'usd'){
            convertedAmount=calculateUSCurrency(fromCurrency,toCurrency,amount);
        }

        if(userbaseCurrency === 'kwd'){
            convertedAmount=calculateKWDCurrency(fromCurrency,toCurrency,amount);
        }

        if(userbaseCurrency === 'euro'){
            convertedAmount=calculateEuroCurrency(fromCurrency,toCurrency,amount);
        }
        
        console.log('converted amount is ',convertedAmount);
        return convertedAmount;
    }


    function calculateINRCurrency(fromCurrency,toCurrency,amount){
        if(fromCurrency === 'inr' && toCurrency === 'inr'){
            return amount;
        }else if(fromCurrency === 'inr' && toCurrency === 'usd'){
            return amount*0.0136141;
        }else if(fromCurrency === 'inr' && toCurrency === 'kwd'){
            return amount*0.00417678;
        }else if(fromCurrency === 'inr' && toCurrency === 'euro'){
            return amount*0.0116173;
        }else{
            return 0;
        }
    }

    function calculateUSCurrency(fromCurrency,toCurrency,amount){
        if(fromCurrency === 'usd' && toCurrency === 'inr'){
            return amount*73.4532;
        }else if(fromCurrency === 'usd' && toCurrency === 'usd'){
            return amount;
        }else if(fromCurrency === 'usd' && toCurrency === 'kwd'){
            return amount*0.306797;
        }else if(fromCurrency === 'usd' && toCurrency === 'euro'){
            return amount*0.853285;
        }else{
            return 0;
        }
    }

    function calculateKWDCurrency(fromCurrency,toCurrency,amount){
        if(fromCurrency === 'kwd' && toCurrency === 'inr'){
            return amount*239.419;
        }else if(fromCurrency === 'kwd' && toCurrency === 'usd'){
            return amount*3.25948;
        }else if(fromCurrency === 'kwd' && toCurrency === 'kwd'){
            return amount;
        }else if(fromCurrency === 'kwd' && toCurrency === 'euro'){
            return amount*2.78126;
        }else{
            return 0;
        }
    }

    function calculateEuroCurrency(fromCurrency,toCurrency,amount){
        if(fromCurrency === 'euro' && toCurrency === 'inr'){
            return amount*86.0828;
        }else if(fromCurrency === 'euro' && toCurrency === 'usd'){
            return amount*1.17194;
        }else if(fromCurrency === 'euro' && toCurrency === 'kwd'){
            return amount*0.359549;
        }else if(fromCurrency === 'euro' && toCurrency === 'euro'){
            return amount;
        }else{
            return 0;
        }
    }

    function handleChange(event){
        setAmount(event.target.value);
    }
    

    //transaction history
    function transHistory(username,amount,status,accountType){
        console.log('sendUserInfo',accBalance);
        let currentDate=new Date();
        let id=custid({});
        let userRef = Firebase.ref('recentTrans/' + id);
            //userRef.set({user2,transDate:currentDate.toDateString()});
            userRef.set({id:user2.id,username:username,amount:amount,accountType:accountType,status:status,transDate:currentDate.toDateString()});
    }

    function handleAccountType(event){
        var index = event.nativeEvent.target.selectedIndex;
        setSendUserInfo({ accType:event.nativeEvent.target[index].text,amount:event.target.value});
        setOrginCurrency();
        if(event.target.value){
            setShowError(true);
        }
        //setAccBalance(event.target.value);
        console.log("sendUserInfo ",sendUserInfo);
    }

    function handleReceiveUser(event){
        var index = event.nativeEvent.target.selectedIndex;
        setReceiveUserInfo({ accType:event.nativeEvent.target[index].text});
        //setAccBalance(event.target.value);
        console.log("setReceiveUserInfo ",receiveUserInfo);
        
        let item=names.find(x=>x.name === xyz.val);
        //user2.country === 'India' ? 'inr' : loggedinUser.country === 'USA' ? 'usd'  :  'kwd';
        let receiverUserCurrency=item?.country === 'India' ? 'inr(India)' : item?.country === 'USA' ? 'usd(USA)'  : item?.country === 'Europe' ? 'euro(Europe)' : 'kwd(Kuwait)' ;
        
        setCurrency(receiverUserCurrency);
        console.log('sender currency is ',receiverUserCurrency);
    }
    
    return (
        <>
        <FloatNav/>
        <div class="wrapper">
            <Sidebar/>
            <div id="content">
                <Navbar/>
                <div class="container px-3">
                    <div className="dash-transfers shadow-sm">

                        <div class="p-4 mx-auto">
                            <h2 class=""><i class="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> Transfer</h2>
                            
                            <div className="row mt-4 p-3">
                                <div class="bg-gradient-green p-4 col-lg-6">
                                    <div class="d-flex">
                                        <div class="mr-3 pt-1">
                                        <i class="fas fa-user"></i><span class="font-weight-bold mx-2"> Sender : </span> <span class="display-7">{loggedinUser.name}       </span>                           
                                        </div>
                                         <div class="mr-3">
                                             <select id="inputState" class="" onChange={handleAccountType}>
                                             <option selected value="0">Select Account</option>
                                                <option  value={user2?.savingAccount}>Savings Account</option>
                                                <option value={user2?.currentAccount}>Current Account</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gradient-red p-4 col-lg-6">    
                                    <div class="pt-1">
                                    Availabel Balance <span class="bg-warning px-3 font-weight-bold py-2">{signUser.country === 'India' ? '₹' : signUser.country === 'USA' ? '$' : signUser.country === 'Kuwait' ? 'د.ك' : signUser.country === 'Europe' ? '€' : 'Select'} { Number(sendUserInfo.amount).toFixed(2)} </span>
                                     {
                                      ((sendUserInfo.accType !== "Select Account" && sendUserInfo.amount<=0) && (showError))&& 
                                      <div class='bg-danger position-relative p-3 mt-2 text-light'>Insufficent Funds unable to transfer</div>
                                    }

                                    {
                                      amount < 0 && <h5 class='bg-danger p-3 mt-3'>Invalid Amount</h5>
                                    }
                                    </div>
                                 </div>                               

                            </div>
                            {
                                Number(sendUserInfo.amount) > 0 && 
                                <div class="container mb-5">
                                <div class="row">
                                <div class="col-12 col-md-4">    
                                    <label class="text-secondary d-block">Transfer To</label>
                                    <div class="autocomplete-wrapper">
                                          <Autocomplete items={names}
                                            disabled={true}
                                            value={xyz.val}
                                            getItemValue={item => item.name}
                                            shouldItemRender={RenderUserInfo}
                                            renderMenu={item => (
                                                <div className="dropdown">
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
                                <div class="col-md-4">
                                    <label class="text-secondary mt-3 mt-md-0">Account Type</label>
                                    <div>
                                     <select id="inputState" disabled={xyz.val === ''} class="" onChange={handleReceiveUser}>
                                        <option selected value="0">Select Account</option>
                                        <option >Savings Account</option>
                                        <option>Current Account</option>
                                    </select>
                                    </div>
                                </div>                                    
                                <div class="col-md-4">
                                    <label class="text-secondary mt-3 mt-md-0">Transfer Amount</label>
                                    <div>
                                        <Textbox name='amount' disabled={xyz.val === '' }  type='number'value={amount} handleChange={handleChange}/>
                                    </div>
                                </div>
                                <div class="col-lg-10 text-right pt-4">
                                            <label class="text-secondary mt-3 mt-md-0"><span class="bb-green mr-3 d-block d-md-inline mb-3">Currency Transfer From :</span> {signUser.country === 'India' ? 'INR (India)' : signUser.country === 'USA' ? 'USD (USA)' : signUser.country === 'Kuwait' ? 'KWD (kuwait)' : signUser.country === 'Europe' ? 'EURO (Europe)' : 'Select'} <span className="bg-round text-light mx-2">To</span> {currency}</label>
                                </div>
                                <div class="col-lg-2 align-self-end mt-3 mt-md-0 text-right"> 
                                    <button className='btn btn-info d-block ml-auto' disabled={xyz.val === '' } onClick={handleTransfer}>Transfer</button>                                  
                                </div>    
                            </div> 
                            </div>  
                            }                                               
                        </div>
                    </div>
                </div>    
            </div>          
        </div>     
        <ToastContainer />
        </>
    )
}