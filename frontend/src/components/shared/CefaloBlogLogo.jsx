import React from 'react'

import blogLogo from "../../assets/logo.jpg"

export default function CefaloBlogLogo() {
    return (
        <div className='inline-flex items-center gap-4 '>
            <img src={blogLogo} className="w-70 h-70 " alt="Cefalo Blog Logo" />
            <h1 className='text-primary text-4xl font-bold'>Cefalo Blog</h1>
        </div>
    )
}
