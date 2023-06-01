import React, { useState } from 'react'

const CreateBlog = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("clicked")
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="bg-blue-500 py-4 px-6 rounded-t-lg text-white">
                    <h3 className="text-xl font-semibold">Create Blog</h3>
                </div>
                <div className="p-6 bg-white rounded-b-lg shadow-md">
                    <textarea
                        className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        required
                        placeholder="Set Title"
                    ></textarea>
                    <textarea
                        className="w-full h-60 mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        name="content"
                        value={inputs.content || ""}
                        onChange={handleChange}
                        required
                        placeholder="What's on your mind?"
                    ></textarea>
                    <button
                        className={`w-full py-2 rounded-lg font-semibold text-white ${inputs.title && inputs.content
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        disabled={(!inputs.title) && (!inputs.content)}
                    >
                        PUBLISH
                    </button>
                </div>
            </form>

        </div>
    )
}
export default CreateBlog;