import React, { useState } from 'react'
import Navbar from '../components/shared/navbar';
import Login from '../components/login';


const UserLogin = () => {

    return (
        <div >
            <div className='navBar'>
                <Navbar />
            </div>

            <div>
                <Login />
            </div>

        </div>
    )
}

export default UserLogin;