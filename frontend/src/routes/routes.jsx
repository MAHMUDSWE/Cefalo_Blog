import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import Error from '../pages/error';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import IndexPage from '../pages';
import HomePage from '../pages/home.page';
import { GuestOrLoggedInMode, LoggedInMode, LoggedOutMode, NotGuestOrLoggedInMode } from './protectedRoutes';
import ProfilePage from '../pages/profile.page';





function PageRoutes() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NotGuestOrLoggedInMode>
                        <IndexPage />
                    </NotGuestOrLoggedInMode>} />

                    <Route path="/login" element={<LoggedOutMode>
                        <LoginPage />
                    </LoggedOutMode>} />

                    <Route path="/signup" element={<LoggedOutMode>
                        <SignupPage />
                    </LoggedOutMode>} />

                    <Route path="/home" element={<GuestOrLoggedInMode>
                        <HomePage />
                    </GuestOrLoggedInMode>} />

                    <Route path="/profile" element={<LoggedInMode>
                        <ProfilePage />
                    </LoggedInMode>} />

                    <Route path="/*" element={<Error />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default PageRoutes;