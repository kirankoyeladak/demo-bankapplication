import React from 'react';

export default function Profile(){
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
    return(
        <>
           <nav id="sidebar">           
            <div class="sidebar-header">
                 <button type="button" id="sidebarCollapseSm" class="btn btn-main d-block d-md-none ml-auto">
                    <i class="fas fa-times-circle"></i>                        
                </button>
                <h5 class="m-0">Bank Application</h5>
                <small><b>Electronic Payment System</b></small>
            </div>

            <ul class="list-unstyled components">               
                <li>
                    <a href="#"><i class="fas fa-tv mr-2"></i> Dashboard</a>
                </li>                
                <li>
                    <a href="#"><i class="fas fa-credit-card mr-2"></i> Payments</a>
                </li>
                <li>
                    <a href="#"><i class="fas fa-history mr-2"></i> History</a>
                </li>
                <li>
                    <a href="#"><i class="fas fa-cog mr-2"></i> Settings</a>
                </li>
            </ul>

        </nav>
        </>
    )
}