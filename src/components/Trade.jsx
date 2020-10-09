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
            <h6><i className="fas fa-arrow-circle-down mr-2 mt-1 ml-4"></i> Currency Exchange </h6>
        </div>
        <div id="trade" class="container bg-white br-10 mt-3 p-4 shadow-sm">
           
           
            <div class="row">
                 <div class="col-4 d-flex flex-column">
                    <label>Amount</label>
                    <Textbox name='name' type='number' value={amount} handleChange={handleChange}/>
                </div>
                <div class="col-4">
                    <label>From</label>
                    <select value={fromTrade} onChange={(e)=>{
                        setFromTrade(e.target.value)
                    }} class="custom-select">
                        <option value='1'>INR</option>
                        <option value='19'>MYR</option>
                        <option value='70'>USD</option>
                    </select>
                </div>
                <div class=" col-4">
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
            <div id="trade-wrapper" class="my-4 d-flex flex-column flex-sm-row">
                <div class="flex-fill mr-md-2">
                    <label>Trade Money</label>
                    <div class="trade-money">{tradeAmount}</div>
                </div>
                <div class="mt-3 mt-sm-0 mr-sm-2">
                    <label class="d-block">Amount</label>
                    <Textbox name='name' type='number' value={amount} handleChange={handleChange}/> 
                </div>
                <div class="mt-3 mt-sm-0">
                    <label class="d-block">Trade Value</label>
                    <Textbox name='name' type='number' value=''/> 
                </div>
                <div class="align-self-end ml-2 mt-3 mt-sm-0">
                    <button class='btn btn-info ml-auto br-10' onClick={handleSubmit}>Trade</button>
                </div>    
            </div>
           
       
        
        </div>
        </>
    )
}