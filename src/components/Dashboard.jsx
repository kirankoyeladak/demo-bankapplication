import React from 'react';
import Navbar from './Layout/Navbar';
import Sidebar from './Sidebar';
import AccountBalance from './AccountBalance';
import Profile from './Profile';
import Trade from './Trade';
import Footer from './Footer';

export default function Dashboard({history}){
    return (
        <>
        	<div class="wrapper">
        		<Sidebar/>
        		<div id="content">
			        <Navbar history={history}/>
			         <section class="mt-4">
			                <div class="container">
			                    <div class="row">
							        <div className="col-lg-8">
							       	 	<AccountBalance/>
							       	 	 <Trade/>
							        </div>
							        <div className="col-lg-4">
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