import React, { useEffect, useRef, useState } from 'react'
import validateInputs from '../../utils/formValidation.util';
import ErrorShow from '../shared/ErrorShow';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';


export default function BlogForm({ onSubmit, data, error, setError }) {

    const editor = useRef();
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const [inputs, setInputs] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        if (data) {
            setInputs({
                title: data.title || "",
                content: data.content || ""
            });
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationError = validateInputs(inputs);
        if (validationError) {
            setError(validationError);
        }
        else {
            onSubmit(inputs);
        }
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const getTitleCharacterCount = () => {
        return inputs.title ? inputs.title.trim().length : 0;
    };

    const getContentCharacterCount = () => {
        return inputs.content ? inputs.content.trim().length : 0;
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 bg-white rounded-b-lg shadow-md">

                <div className='mb-4'>
                    <label htmlFor="title" className="block font-medium mb-1">
                        Title
                    </label>
                    <textarea
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        required
                        placeholder="Set Title"
                        className="w-full h-12 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    ></textarea>
                    <span className="text-gray-500 text-sm float-right">
                        Title character: {getTitleCharacterCount()}/200
                    </span>
                </div>

                <div className='mb-8'>
                    <label htmlFor="Content" className="block font-medium mb-1">
                        Content
                    </label>
                    <textarea
                        name="content"
                        value={inputs.content || ""}
                        onChange={handleChange}
                        required
                        placeholder="What's on your mind?"
                        className="w-full h-60 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    ></textarea>
                    <span className=" text-gray-500 text-sm float-right">
                        Content character: {getContentCharacterCount()}/20000
                    </span>
                </div>

                <ErrorShow error={error} />

                <button
                    className={`w-full py-2 rounded-lg font-semibold text-white ${inputs.title && inputs.content
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    disabled={(!inputs.title) && (!inputs.content)}
                >
                    {data ? "SAVE" : "PUBLISH"}
                </button>
            </div>
        </form>
    )
}
