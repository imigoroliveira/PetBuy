import React from 'react';

export function SortProduct({ sortOption, onSort }) {
  return (
    <div className="col-md-12 col-sm-12 d-flex align-items-center justify-content-end text-end">
      <select className="form-select" value={sortOption} onChange={onSort}>
        <option value="">Filter by...</option>
        <option value="priceHigherToLower">Price (Higher to Lower)</option>
        <option value="priceLowertToHigher">Price (Lower to Higher)</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}