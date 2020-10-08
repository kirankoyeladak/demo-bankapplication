import React from 'react';
import { useState } from 'react';
import Textbox from './reusableComponents/Textbox';

export default function Trade(){
    const [fromTrade,setFromTrade]=useState();
    const [toTrade,setToTrade]=useState();
    const [amount,setAmount]=useState();
    const [tradeAmount,setTradeAmount]=useState(0);

    function handleChange({target}){
        setAmount({...amount,[target.name]:target.value})
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(100/17);
         let calculateTrade=(amount.name*fromTrade)/toTrade;
         setTradeAmount(Number(calculateTrade));
    }
    
    return (
        <>
        <div className="mt-4">
            <h6><i className="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> Currency Exchange </h6>
        </div>
        <div id="trade" class="container bg-white br-10 mt-3 p-4 shadow-sm">
           
            <div>
                <label>Amount</label>
                <Textbox name='name' type='number' value={amount} handleChange={handleChange}/>
            </div>
            <div class="d-flex mt-4">
                <div class="flex-fill mr-2">
                    <label>From</label>
                    <select value={fromTrade} onChange={(e)=>{
                        setFromTrade(e.target.value)
                    }} class="custom-select">
                        <option value='1'>INR</option>
                        <option value='19'>MYR</option>
                        <option value='70'>USD</option>
                    </select>
                </div>
                <div class="flex-fill">
                    <label>To</label>
                    <select value={toTrade} onChange={(e)=>{
                        setToTrade(e.target.value)
                    }} class="custom-select">
                        <option value='1'>INR</option>
                        <option value='19'>MYR</option>
                        <option value='70'>USD</option>
                    </select>
                </div>
            </div>
            <div class="my-4 d-flex">
                <div class="flex-fill mr-2">
                    <label>Trade Money</label>
                    <div class="bg-warning p-2">{tradeAmount}</div>
                </div>
                <div class="flex-fill">
                    <label>Amount</label>
                    <Textbox name='name' type='number' value={amount} handleChange={handleChange}/> 
                </div>
                <div class="align-self-end ml-2">
                    <button class='btn btn-info ml-auto br-10' onClick={handleSubmit}>Trade</button>
                </div>    
            </div>
           
       
        
        </div>
        </>
    )
}