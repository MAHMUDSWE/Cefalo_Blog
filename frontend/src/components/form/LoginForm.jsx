import React, { useState } from 'react'
import ShowPassword from '../shared/ShowPassword';
import ErrorShow from '../shared/ErrorShow';


export default function LoginForm({ onSubmit, loginError, setLoginError }) {

    const [inputs, setInputs] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = inputs.username.trim();
        const password = inputs.password.trim();

        if (!(username.length > 1)) {
            setLoginError('Username is required');
            return;
        }
        if (username.length < 4) {
            setLoginError('Username must be at least 4 characters');
            return;
        }

        if (!(password.length > 1)) {
            setLoginError('Password is required');
            return;
        }
        if (password.length < 4) {
            setLoginError('Password must be at least 4 characters');
            return;
        }

        onSubmit(inputs);

    };

    const onTogglePassword = (showPassword) => {
        setShowPassword(showPassword);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                    <label htmlFor="username" className="block font-medium mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name='username'
                        value={inputs.username || ""}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required pattern="[a-z A-Z 0-9]+"
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${loginError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                    />
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block font-medium mb-1">
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name='password'
                        value={inputs.password || ""}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${loginError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                        placeholder="Enter your password"
                    />
                    {inputs.password && <ShowPassword onTogglePassword={onTogglePassword} />}
                </div>

                <ErrorShow loginError={loginError} />

                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"  >
                    Log In
                </button>
            </form></>
    )
}
