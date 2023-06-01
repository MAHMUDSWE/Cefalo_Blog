import React from 'react';
import CreateBlog from '../blog/CreateBlog';

function CustomModal({ onClose }) {
    // Add a CSS class to the root element based on whether the modal is open
    const modalClass = onClose ? 'modal-open' : '';

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${modalClass}`}>
            <div className="bg-black opacity-60 fixed inset-0"></div> {/* Overlay with 0.6 opacity */}

            <div className="bg-white -mb-1 rounded-lg shadow-md relative">

                <CreateBlog />

                <div className="py-2 px-6 rounded-b-lg bg-white text-right">
                    <button
                        className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>

        </div>
    );
}

export default CustomModal;
