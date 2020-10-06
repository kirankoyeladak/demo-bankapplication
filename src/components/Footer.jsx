import React from 'react';

export default function Footer(){
    let loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
    return(
        <>
            <footer class="text-right mt-5 px-3">
                <small class="text-secondary">Copyright © 2020  </small>
            </footer>
        </>
    )
}