import React from 'react';
import WarningIcon from './WarningIcon';

const ErrorShow = ({ loginError }) => {
    return (
        <>
            {loginError && (
                <div className="text-red-500 -mt-3 mb-3 text-center">{loginError} {loginError && <WarningIcon />}</div>
            )}
        </>
    );
};

export default ErrorShow;
