import React from 'react'
import { BrowserRouter, Routes, Route, createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

//pages
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import IndexPage from '../pages/IndexPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import ErrorPage from '../pages/ErrorPage';

import { GuestOrLoggedInMode, LoggedInMode, LoggedOutMode, NotGuestOrLoggedInMode } from './protectedRoutes';


function PageRoutes() {

    // const routes = createBrowserRouter([
    //     {
    //         path: "/",
    //         element: <Outlet />,
    //         errorElement: <ErrorPage />,
    //         children: [
    //             {
    //                 path: "/",
    //                 element: <IndexPage />,
    //                 children: [{
    //                     path: "signup",
    //                     element: <SignupPage />
    //                 }, {
    //                     path: "",
    //                     element: <LoginPage />
    //                 }]
    //             },
    //             {
    //                 path: "/home",
    //                 element: <HomePage />
    //             }, {
    //                 path: "/profile",
    //                 element: <LoggedInMode>
    //                     <ProfilePage />
    //                 </LoggedInMode>
    //             }
    //         ]
    //     }
    // ])

    return (
        <div>
            {/* <RouterProvider router={routes} /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NotGuestOrLoggedInMode>
                        <IndexPage />
                    </NotGuestOrLoggedInMode>} >
                        <Route path="/" element={<LoggedOutMode>
                            <LoginPage />
                        </LoggedOutMode>} />

                        <Route path="signup" element={<LoggedOutMode>
                            <SignupPage />
                        </LoggedOutMode>} />

                    </Route>

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

                    <Route path="/*" element={<ErrorPage />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default PageRoutes;