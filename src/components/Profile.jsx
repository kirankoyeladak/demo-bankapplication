import React from 'react';

export default function Profile(){
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
    return(
        <>
            <div className="col-lg-4 mt-4 mt-lg-0">
                <section className="br-10 bg-light shadow-sm">
                    <div className="text-center">
                        <div className="p-3">
                            <img src={loggedInUser.userAvatar} width="70" className="rounded-circle mb-2" />
                            <h5 className="mb-0">{loggedInUser.name} </h5>
                            <small>New York City - USA<br /> <a href="" className="text-info">User Settings</a></small>
                        </div>
                        <div className="d-flex flex-row border-top border-bottom mt-3">
                            <div className="p-4 text-center w-50 border-right"><b>47</b> <br /><small>Operations</small></div>
                            <div className="p-4"><b>+$ {loggedInUser.accountBalance} </b><br /><small>Amount</small></div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}