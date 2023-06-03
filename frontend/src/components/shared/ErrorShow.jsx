import React from 'react';
import WarningIcon from './WarningIcon';

const ErrorShow = ({ error }) => {
    return (
        <>
            {error && (
                <div className="text-red-500 -mt-3 mb-3 text-center">
                    {error} {error && <WarningIcon />}
                </div>
            )}
        </>
    );
};

export default ErrorShow;
