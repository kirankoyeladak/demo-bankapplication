import React from 'react';
import { useState } from 'react';
import Textbox from './reusableComponents/Textbox';
import cuid from 'custom-id';
import Firebase from '../api/config';
import { ToastContainer, toast } from 'react-toastify';
export default function Trade(){
    const tradeObj={
        id:"",
        userid:"",
        amount:0,
        fromCurrency:"",
        toCurrency:"",
        tradeMoney:0,
        convertTradeMoney:0,
        bidTradeMoney:0
    }
    const [trade,setTrade]=useState(tradeObj);
    const [fromTrade,setFromTrade]=useState();
    const [toTrade,setToTrade]=useState();
    const [amount,setAmount]=useState(0);
    const [tradeAmount,setTradeAmount]=useState(0);
    const [bidMoney,setBidMoney]=useState(0);

    function handleChange({target}){
        if(target.name === 'convertTradeMoney'){
            setBidMoney({...bidMoney,[target.name]:target.value});
            console.log(bidMoney);
        }
        setAmount({...amount,[target.name]:target.value});
        setTrade({...trade,[target.name]:target.value});
    }

    function calculateTrade(toTrade){
        let finalPrice=Number((amount.amount*fromTrade)/toTrade);
        let loggedinUser=JSON.parse(localStorage.getItem('loggedInUser'));
        let loginUser=loggedinUser.id;
        setTradeAmount(Number(finalPrice).toFixed(2));
        setTrade({userid:loginUser,id:cuid({}),fromCurrency:fromTrade,toCurrency:toTrade,amount:amount.amount,tradeMoney:toTrade,convertTradeMoney:tradeAmount,bidTradeMoney:0});
    }

    function handleSubmit(event){
        event.preventDefault();
        let userRef = Firebase.ref('usertrade/' + trade.id);        
        userRef.set(trade);
        toast.success('Data Saved successfully',{
            position:toast.POSITION.BOTTOM_RIGHT
        });
    }
    
    return (
        <>
        <div className="mt-4">
            <h6><i className="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> Currency Exchange </h6>
        </div>
        <div id="trade" class="container bg-white br-10 mt-3 p-4 shadow-sm">
           
            <div>
                <label>Amount</label>
                <Textbox name='amount' type='number' value={amount} handleChange={handleChange}/>
            </div>
            <div class="d-flex mt-4">
                <div class="flex-fill mr-2">
                    <label>From</label>
                    <select value={fromTrade} onChange={(e)=>{
                        setFromTrade(e.target.value)
                    }} class="custom-select">
                        <option selected>Select</option>
                        <option value='1'>INR</option>
                        <option value='19'>MYR</option>
                        <option value='70'>USD</option>
                    </select>
                </div>
                <div class="flex-fill">
                    <label>To</label>
                    <select value={toTrade} onChange={(e)=>{
                        if(e.target.value != "select"){
                            setToTrade(e.target.value);
                            calculateTrade(e.target.value);
                        }
                        else
                        setToTrade(0);
                    }} class="custom-select">
                        <option value='select' selected>Select</option>
                        <option value='1'>INR</option>
                        <option value='19'>MYR</option>
                        <option value='70'>USD</option>
                    </select>
                </div>
            </div>
            <div class="my-4 d-flex">
                <div class="flex-fill mr-2">
                    <label>Trade Money</label>
                    <div class="bg-warning p-2">{toTrade}</div>
                </div>
                <div class="flex-fill mr-2">
                    <label>Calculate Amount</label>
                    <div class="bg-warning p-2">{tradeAmount}</div>
                </div>
                {/* <div class="flex-fill">
                    <label>Amount</label>
                    <Textbox name='convertTradeMoney' type='number' value={tradeAmount} handleChange={handleChange}/> 
                </div> */}
                <div class="flex-fill">
                    <label>Current Trade Amount</label>
                    <Textbox name='convertTradeMoney' type='number' value={tradeAmount} handleChange={handleChange}/> 
                </div>
                <div class="align-self-end ml-2">
                    <button class='btn btn-info ml-auto br-10' onClick={handleSubmit}>Trade</button>
                </div>    
            </div>
            <ToastContainer />
        </div>
        </>
    )
}