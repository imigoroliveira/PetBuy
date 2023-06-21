import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const localStorageItems = JSON.parse(localStorage.getItem('cartItems')) || {};
        const productIds = Object.values(localStorageItems);
        const fetchedProducts = await Promise.all(
          productIds.map((id) =>
            axios.get(`http://localhost:3001/product/list/${id}`).then((res) => res.data)
          )
        );
        setCartItems(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);


 // Function to remove the product from cart/local storage
 const handleRemoveFromCart = (productId) => {
  const updatedCartItems = cartItems.filter((item) => item._id !== productId);
  setCartItems(updatedCartItems);
};


  return (
    <div className="container">
    <h2>Produtos Adicionados ao Carrinho:</h2>
    {cartItems.length === 0 ? (
      <p>Nenhum produto no carrinho</p>
    ) : (
      <ul className="cart-items">
        {cartItems.map((product) => (
          <li key={product._id} className="cart-item d-flex align-items-center mb-3">
            <img src={'data:image/jpeg;base64,'+ btoa (String.fromCharCode(...product.image.data))} alt="user-avatar" className="product-image me-3" />
            <div className="product-details">
              <h4>{product.name}</h4>
              <p>Preço: {product.price}</p>
              <button onClick={() => handleRemoveFromCart(product._id)} className="btn btn-danger">Remover do carrinho</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default Checkout;
