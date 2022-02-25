import React from 'react';

const ErrorMessage = ({ error }) => {
    return (
        <div className='alert alert-danger' role='alert'>
            {error}
        </div>
    );
};

export default ErrorMessage;