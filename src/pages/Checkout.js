import React from 'react';
import { useState } from 'react';
import Title from '../components/Atom/Title';

function Checkout() {

  const [order, setOrder] = useState({
    code: '',
    totalAmount: 0,
    products: [],
    customer: '',
    date: '',
    time: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fazer algo com os dados do pedido
    console.log(order);
  };


    return (
      <div className="container">
      <h1>Novo Pedido</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Código do Pedido
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={order.code}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Preço Total
          </label>
          <input
            type="number"
            className="form-control"
            id="totalAmount"
            name="totalAmount"
            value={order.totalAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="products" className="form-label">
            Produtos
          </label>
          <textarea
            className="form-control"
            id="products"
            name="products"
            value={order.products}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="customer" className="form-label">
            Cliente
          </label>
          <input
            type="text"
            className="form-control"
            id="customer"
            name="customer"
            value={order.customer}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Data
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={order.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Hora
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="time"
            value={order.time}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status do Pedido
          </label>
          <input
            type="text"
            className="form-control"
            id="status"
            name="status"
            value={order.status}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Criar Pedido
        </button>
      </form>
    </div>
  );
}
export default Checkout;