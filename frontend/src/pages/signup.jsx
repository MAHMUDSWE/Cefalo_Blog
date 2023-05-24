import React, { useState } from 'react'
import Navbar from '../components/shared/navbar';
import Signup from '../components/signup';


const UserLogin = () => {

    return (
        <div >
            <div className='navBar'>
                <Navbar />
            </div>

            <div>
                <Signup />
            </div>

        </div>
    )
}

export default UserLogin;