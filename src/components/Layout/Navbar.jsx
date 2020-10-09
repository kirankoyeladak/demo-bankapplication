import React from 'react';
import { NavLink } from 'react-router-dom';
import Firebase from '../../api/config';

export default function Navbar({history}){
    // var ref = Firebase.ref("users");
    // ref.orderByChild("id").equalTo('01GJ02VD').on("child_added", function(snapshot) {        
    //     console.log(snapshot.key + " was " + snapshot.val().mobileNo + " meters tall");
    //   });

    let currentDate=new Date();
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));

    const handleLgout=()=>{
        console.log('history',history);
        localStorage.clear();
        //history.push('/login');
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">

                    <button type="button" id="sidebarCollapse" className="btn btn-main">
                        <i className="fas fa-align-left"></i>                        
                    </button>
                   
                    <div>
                        <h6 className="m-0"> Welcome , {loggedInUser.name ? loggedInUser.name : ''}!</h6>
                        <small>{currentDate.toDateString()} </small>
                    </div>

                    <div className="mt-3 mt-lg-0">
                        <ul className="nav navbar-nav secondary-nav">                            
                            <li className="nav-item mr-3 mr-lg-0">
                                <a className="nav-link" href="#"><i className="fas fa-envelope-open"></i> Messages</a>
                            </li>
                            <li className="nav-item mr-3 mr-lg-0">
                                <a className="nav-link" href="#"><i className="fas fa-bell"></i> Notifications</a>
                            </li>
                            <li className="nav-item mr-3 mr-lg-0">
                                <NavLink to='/login' onClick={handleLgout} className="nav-link">
                                <i className="fas fa-power-off"></i> Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}