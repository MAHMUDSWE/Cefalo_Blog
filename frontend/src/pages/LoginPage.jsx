import React, { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query';

import CefaloBlogLogo from '../components/shared/CefaloBlogLogo';
import ForgottenPassword from '../components/auth/ForgottenPassword';
import CreateNewAccountButton from '../components/auth/CreateNewAccountButton';
import blogLogo from "../assets/logo.jpg";
import LoginForm from '../components/form/LoginForm';

import { AuthService } from '../services/auth.service';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { storeAccessToken } from '../utils/token.util';


export default function LoginPage() {

    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(null);

    const loginMutation = useMutation({
        mutationFn: AuthService.login,

        onSuccess: (data) => {
            storeAccessToken(data.access_token);
            setIsLoggedIn(!!data.access_token);

            navigate("/home");
        },
        onError: (data) => {
            if (data.response.status == 503) {
                setLoginError("Oops! Something went wrong. Please Try Again Later.")
            }
            else {
                setLoginError(data.response.data.message);
            }
        }
    });

    const onSubmit = async (credential) => {
        await loginMutation.mutateAsync(credential);
    }


    return (
        <div className='mt-1'>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

                {window.location.href.endsWith('/login') &&
                    <CefaloBlogLogo />
                }

                <div className="w-96 p-8 bg-white rounded shadow-lg mt-2">

                    <div className='inline-flex text-center gap-3 mb-3'>
                        <p className="text-center text-2xl">Log in to Cefalo Blog </p>

                        <img src={blogLogo} className="w-10 h-10 " alt="Cefalo Blog Logo" />
                    </div>

                    <LoginForm onSubmit={onSubmit} loginError={loginError} setLoginError={setLoginError} />

                    <ForgottenPassword />

                    {!window.location.href.endsWith('/login') && <CreateNewAccountButton />}
                </div>
            </div>
        </div>
    )
}