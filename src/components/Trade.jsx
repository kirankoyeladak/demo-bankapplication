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
            //setBidMoney({...bidMoney,[target.name]:target.value});
            let loggedinUser=JSON.parse(localStorage.getItem('loggedInUser'));
            let loginUser=loggedinUser.id;
            setTrade({userid:loginUser,id:cuid({}),fromCurrency:fromTrade,toCurrency:toTrade,amount:amount.amount,tradeMoney:toTrade,convertTradeMoney:tradeAmount,bidTradeMoney:target.value});
        }
        setAmount({...amount,[target.name]:target.value});
        //setTrade({...trade,[target.name]:target.value});
    }

    function calculateTrade(toTrade){
        let finalPrice=Number((amount.amount*fromTrade)/toTrade);
        setTradeAmount(Number(finalPrice).toFixed(2));
    }

    function handleSubmit(event){
        event.preventDefault();
        let userRef = Firebase.ref('usertrade/' + trade.id);        
        userRef.set(trade);
        toast.success('Data Saved successfully',{
            position:toast.POSITION.BOTTOM_RIGHT
        });
        setFromTrade('Select');
        setToTrade('Select');
        setAmount(0);
        setTradeAmount(0);
    }
    
    return (
        <>
        <div className="mt-4">
            <h6><i className="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> Currency Exchange </h6>
        </div>
        <div id="trade" class="container bg-white br-10 mt-3 p-4 shadow-sm">
            
                <div class="row">
                    <div class="col-4 d-flex flex-column">
                        <label>Amount</label>
                        <Textbox name='amount' type='number' value={amount} handleChange={handleChange}/>
                    </div>
                    <div class="col-4">
                    
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
                    <div class="col-4">
                        <label>To</label>
                        <select value={toTrade} onChange={(e)=>{
                            if(e.target.value !== "select"){
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
                <div id="trade-wrapper" class="row mt-3 bg-light">
                    <div class="col-md-4 py-2 py-md-3 align-self-end">
                        <label>Trade Money</label>
                        <div class="bg-warning p-2">{toTrade === 'Select' ? '0' : toTrade}</div>
                    </div>
                    <div class="col-md-4 py-md-3 align-self-end">
                        <label>Calculate Amount</label>
                        <div class="trade-money">{tradeAmount}</div>
                    </div>
                    {/* <div class="flex-fill">
                        <label>Amount</label>
                        <Textbox name='convertTradeMoney' type='number' value={tradeAmount} handleChange={handleChange}/> 
                    </div> */}
                    <div class="col-md-4 mt-2 mt-md-3">
                        <label>Current Trade Amount</label>
                        <Textbox name='convertTradeMoney' type='number' value={tradeAmount} handleChange={handleChange}/> 
                    </div>
                </div>    
                    <div class="mt-3 text-right">
                        <button class='btn btn-info ml-auto br-10' onClick={handleSubmit}>Trade</button>
                    </div>    
                
              
            <ToastContainer />
        </div>
        </>
    )
}