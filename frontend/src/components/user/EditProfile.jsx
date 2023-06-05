import React, { useState } from 'react';

export default function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        // You can use the form data to update the user profile
        // Reset the form and update the user profile accordingly
        setIsEditing(false);
    };

    return (
        <div className="container ">

            {isEditing ? (
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Form fields to update user profile */}
                        <div>
                            <label className="block mb-1" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        {/* Add more fields as needed */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={handleEditButtonClick}
                    className=" min-w-[280px] md:min-w-[280px] bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400"
                >
                    Edit Profile
                </button>
            )}
        </div>

    );
}
