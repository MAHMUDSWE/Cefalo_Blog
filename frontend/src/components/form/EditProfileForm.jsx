import React, { useState } from 'react'
import ErrorShow from '../shared/ErrorShow';
import validateInputs from '../../utils/formValidation.util';

export default function EditProfileForm({ onSubmit, profileData, error, setError }) {

    const [inputs, setInputs] = useState({
        name: profileData?.name,
        email: profileData?.email,
        username: profileData?.username
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationError = validateInputs(inputs);
        if (validationError) {
            setError(validationError);
        }
        else {
            onSubmit(inputs);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="fullname" className="block font-medium mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        name='name'
                        value={inputs.name || ""}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={inputs.email || ""}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                    />
                </div>
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
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                    />
                </div>
                <ErrorShow error={error} />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                    Update Profile
                </button>
            </form>
        </>
    )
}
