import React from 'react';

export default function Title({ title }) {
    return (
        <div className="container d-flex align-items-center justify-content-center">
            <h1 className="display-4">{title}</h1>
        </div>
    );
}