import React from 'react';
import Navbar from './Layout/Navbar';
import FloatNav from './FloatNav';
import Sidebar from './Sidebar';
import AccountBalance from './AccountBalance';
import Profile from './Profile';
import TransactionHistory from './TransactionHistory';
import Footer from './Footer';

export default function Dashboard({history}){
    return (
        <>
        	<FloatNav/>
        	<div class="wrapper">
        		<Sidebar/>
        		<div id="content">
			        <Navbar history={history}/>
			         <section>
			                <div class="container">
			                    <div class="row">
							        <div className="col-lg-7 pl-lg-4">
							       	 	<AccountBalance/>
							       	 	 {/* <Trade/> */}
										<TransactionHistory/>
							        </div>
							        <div className="col-lg-5">
							        	<Profile/>
			                        </div>   
						         </div>
			                </div>
			         </section>
			         <Footer/>  
        		</div>
	        </div> 
        </>
    )
}