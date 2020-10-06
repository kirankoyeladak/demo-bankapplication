import React from 'react';
import { NavLink } from 'react-router-dom';
export default function AccountBalance(){
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
    return(
        <>
           
                        <div className="col-lg-8">
                            <div className="d-flex flex-row">
                                <div className="">
                                    <h6><i className="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> My Accounts</h6>
                                </div>
                                <div class="flex-fill text-right">
                                    <NavLink to='transfer' className="btn btn-info ml-auto">
                                    <i className="fas fa-paper-plane"></i> New Transfer
                                    </NavLink>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex flex-md-row flex-column shadow-sm mt-4 bg-light br-10">
                                    <div className="pt-4 pl-4 p-md-4 text-secondary"><p className="font-weight-bold text-success m-0">Current Account</p>55221455665878</div>                                    
                                    <div className="pl-4 pb-4 p-md-4 border-left flex-fill text-right"><b>Available</b><br />$ {loggedInUser.accountBalance}  </div>
                                </div>

                                <div className="d-flex flex-md-row flex-column shadow-sm mt-4 bg-light br-10">
                                    <div className="pt-4 pl-4 p-md-4 text-secondary"><p className="font-weight-bold text-success m-0">Savings Account</p>55221455665878</div>                                    
                                    <div className="pl-4 pb-4 p-md-4 border-left flex-fill text-right"><b>Available</b><br />$6,214.55</div>
                                </div>
                            </div>
                            
                        </div>
                   
        </>
    )
}