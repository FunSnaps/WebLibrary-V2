import React from 'react';

const Loading = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="row">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="row">
                <strong>Collecting data</strong>
            </div>
        </div>
    );
};

export default Loading;