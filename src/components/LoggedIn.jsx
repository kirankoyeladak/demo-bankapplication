import React from 'react';

export default function LoggedIn(){
    return(
        <>
         <ul class="list-unstyled components" id="floating-nav">
             
             <li>
                 <a href="#"><i class="fas fa-tv"></i></a>
             </li>                
             <li>
                 <a href="#"><i class="fas fa-credit-card"></i></a>
             </li>
             <li>
                 <a href="#"><i class="fas fa-history"></i></a>
             </li>
             <li>
                 <a href="#"><i class="fas fa-cog"></i></a>
             </li>
 </ul>
         
 <div class="wrapper">
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

     <div id="content">
         <div id="brand-name">
             <h5 class="m-0">Bank Application</h5>
             <small><b>Electronic Payment System</b></small>
         </div>
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
             <div class="container-fluid">

                 <button type="button" id="sidebarCollapse" class="btn btn-main">
                     <i class="fas fa-align-left"></i>                        
                 </button>
                
                 <div>
                     <h6 class="m-0"> Welcome Back, John!</h6>
                     <small>30 September 2020</small>
                 </div>

                 <div class="mt-3 mt-lg-0">
                     <ul class="nav navbar-nav secondary-nav">                            
                         <li class="nav-item mr-3 mr-lg-0">
                             <a class="nav-link" href="#"><i class="fas fa-envelope-open"></i> Messages</a>
                         </li>
                         <li class="nav-item mr-3 mr-lg-0">
                             <a class="nav-link" href="#"><i class="fas fa-bell"></i> Notifications</a>
                         </li>
                         <li class="nav-item mr-3 mr-lg-0">
                             <a class="nav-link" href="#"><i class="fas fa-power-off"></i> Logout</a>
                         </li>
                     </ul>
                 </div>
             </div>
         </nav>

         <section class="">
             <div class="container p-0">
                 <div class="row">
                     <div class="col-lg-8">
                         
                         
                         <div class="d-flex flex-row">
                             <div class="flex-fill">
                                 <h6><i class="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> My Accounts</h6>
                             </div>
                             <div>                                    
                                 <a href="" class="btn btn-info ml-auto"><i class="fas fa-paper-plane"></i> New Transfer</a>
                             </div>
                         </div>                  
                         
                         <div>
                             <div class="d-flex flex-md-row flex-column shadow-sm mt-4 bg-light br-10">                         
                                 <div class="pt-4 pl-4 p-md-4 border-right flex-fill text-secondary"><p class="font-weight-bold text-success m-0">Current Account</p>55221455665878</div>
                                 <div class="pl-4 p-md-4 border-right bg-ac"><span class="display-6">$1,742.23</span></div>
                                 <div class="pl-4 pb-4 p-md-4"><b>Available</b><br/>$6,214.55</div>                           
                             </div>

                             <div class="d-flex flex-md-row flex-column shadow-sm mt-4 bg-light br-10">                         
                                 <div class="pt-4 pl-4 p-md-4 border-right flex-fill text-secondary"><p class="font-weight-bold text-success m-0">Savings Account</p>55221455665878</div>
                                 <div class="pl-4 p-md-4 border-right bg-ac"><span class="display-6">$2,442.23</span></div>
                                 <div class="pl-4 pb-4 p-md-4"><b>Available</b><br/>$6,214.55</div>                           
                             </div>
                             
                         </div>
                         
                         <div class="container bg-light shadow-sm mt-4 p-3 br-10">              
                             <div class="row">
                                 <div class="col-6 col-md-5">
                                 
                                         <label class="d-none d-md-block">From</label>
                                         <select class="selectpicker my-image-selectpicker w-100" data-live-search="true">
                                             <option data-thumbnail="cur/mus.png">USD</option>
                                             <option data-thumbnail="cur/uk.png">GBP</option>
                                             <option data-thumbnail="cur/eu.png">EURO</option>
                                             <option data-thumbnail="cur/aus.png">AUD</option>
                                             <option data-thumbnail="cur/kuw.png">KUD</option>
                                             <option data-thumbnail="cur/qar.png">QAR</option>
                                                                           
                                         </select>
                                         <input class="trade-input" type="text" value="100.00" onblur="if (this.value == '') {this.value = '100.00';}"
onfocus="if (this.value == '100.00') {this.value = '';}"/>
                                 </div>
                                 <div class="col-6 col-md-5 pt-md-0">    
                                                                   
                                         <label class="d-none d-md-block">To</label>
                                         <select class="selectpicker my-image-selectpicker w-100" data-live-search="true">                           
                                             <option data-thumbnail="cur/uk.png">GBP</option>
                                             <option data-thumbnail="cur/mus.png">USD</option>
                                             <option data-thumbnail="cur/eu.png">EURO</option>
                                             <option data-thumbnail="cur/aus.png">AUD</option>
                                             <option data-thumbnail="cur/kuw.png">KUD</option>                
                                             <option data-thumbnail="cur/qar.png">QAR</option>        
                                         </select>
                                         <input class="trade-input" type="text" value="77.32" disabled/>
                                 </div>
                                 <div class="col-12 col-md-2 pt-2 pt-md-0 text-right text-md-left trade-submit">                                                               
                                         <input type="submit" value="Trade" class="btn btn-danger m-0 mt-md-5"/>
                                 </div>          
                             </div>                      
                         </div>


                     </div>
                     <div class="col-lg-4 mt-4 mt-lg-0">
                         <section class="br-10 bg-light shadow-sm">
                             <div class="text-center">
                                 <div class="p-3">
                                     <img src="profile_user4.png" width="70" class="rounded-circle mb-2"/>
                                     <h5 class="mb-0">John Deo</h5>
                                     <small>New York City - USA<br/> <a href="" class="text-info">User Settings</a></small>
                                 </div> 
                                 <div class="d-flex flex-row border-top border-bottom mt-3">                         
                                     <div class="p-4 text-center w-50 border-right"><b>47</b> <br/><small>Operations</small></div>                    
                                     <div class="p-4"><b>+$5,000.10</b><br/><small>Amount</small></div>                                       
                                 </div>
                             </div>
                         </section>

                         <section class="recent-act mt-4 bg-light p-4 br-10 shadow-sm">
                             <h6><i class="fas fa-arrow-circle-down mr-2 mt-1 ml-2"></i> Recent Activity</h6>
                         </section>
                     </div>
                 </div>
             </div>
         </section>
         <footer class="text-right mt-5 px-3">
             <small class="text-secondary">Copyright © 2020  </small>
         </footer>


     </div>
 </div>
        </>
    )
}