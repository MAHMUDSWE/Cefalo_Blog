import React, { useState } from 'react'
import { FaEye as EyeOn, FaEyeSlash as EyeOff } from 'react-icons/fa';

export default function ShowPassword({ onTogglePassword }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        const updateShowPassword = !showPassword
        setShowPassword(updateShowPassword);

        onTogglePassword(updateShowPassword);
    };

    return (
        <div
            className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleTogglePassword}
        >
            {showPassword ? <EyeOn /> : <EyeOff />}
        </div>
    )
}
