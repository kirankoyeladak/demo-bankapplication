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
        <div class="container">
        <h1>Trade Page</h1>
        <label>Amount</label>
        <Textbox name='name' type='number' value={amount} handleChange={handleChange}/>
        <label>From</label>
        <select value={fromTrade} onChange={(e)=>{
            setFromTrade(e.target.value)
        }} class="custom-select">
            <option value='1'>INR</option>
            <option value='19'>MYR</option>
            <option value='70'>USD</option>
        </select>
        <label>To</label>
        <select value={toTrade} onChange={(e)=>{
            setToTrade(e.target.value)
        }} class="custom-select">
            <option value='1'>INR</option>
            <option value='19'>MYR</option>
            <option value='70'>USD</option>
        </select>
        <hr/>
        <button class='btn btn-primary' onClick={handleSubmit}>Trade</button>
        <br/>
        <hr/>
        Trade Money:-{tradeAmount}
        </div>
        </>
    )
}