import React from 'react';
import Navbar from './Layout/Navbar';
import Sidebar from './Sidebar';
import AccountBalance from './AccountBalance';
import Profile from './Profile';

export default function Dashboard({history}){
    return (
        <>
        	<div class="wrapper">
        		<Sidebar/>
        		<div id="content">
			        <Navbar history={history}/>
			         <section class="mt-4">
			                <div class="container p-0">
			                    <div class="row">
							        
							        <AccountBalance/>
							        <Profile/>
			                           
						         </div>
			                </div>
			         </section>  
        		</div>
	        </div> 
        </>
    )
}