import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function WarningIcon() {
    return (
        // <div className="absolute mt-4 p-1 rounded-full right-2 top-1/2 transform -translate-y-1/2">
        //  </div > 
        <>
            < FontAwesomeIcon icon={faExclamationTriangle} beat style={{ color: "#ef4444", }} />
        </>


    )
}
