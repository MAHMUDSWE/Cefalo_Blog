import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import Home from '../pages/home';
import UserLogin from '../pages/login';

import { ProtectedRoutes, ProtectedRoutesBeforeLogin } from './protectedRoutes';
import Error from '../pages/error';
import Signup from '../components/signup';



function PageRoutes() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoutesBeforeLogin>
                        <Home />
                    </ProtectedRoutesBeforeLogin>} />
                    <Route path="/login" element={<ProtectedRoutesBeforeLogin>
                        <UserLogin />
                    </ProtectedRoutesBeforeLogin>} />

                    <Route path="/signup" element={<ProtectedRoutesBeforeLogin>
                        <Signup />
                    </ProtectedRoutesBeforeLogin>} />


                    <Route path="/*" element={<Error />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default PageRoutes;