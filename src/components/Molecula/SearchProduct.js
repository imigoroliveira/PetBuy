import React from 'react';

export function SearchProduct({ searchTerm, onSearch }) {
    return (
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search product"
          value={searchTerm}
          onChange={onSearch}
        />
      </div>
    );
  }