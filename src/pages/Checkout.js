import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
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
  
    const localStorageItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    const updatedLocalStorageItems = Object.keys(localStorageItems).reduce((acc, key) => {
      if (localStorageItems[key] !== productId) {
        acc[key] = localStorageItems[key];
      }
      return acc;
    }, {});
    localStorage.setItem('cartItems', JSON.stringify(updatedLocalStorageItems));
  };

  return (
    <div className="container">
      <br></br> <br></br>

      <h3>Products added to Cart:</h3>
      {cartItems.length === 0 ? (
        <p>No product in cart</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((product) => (
            <li key={product._id} className="cart-item d-flex align-items-center mb-3">
               {product.image ? (
                <img src={`data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`} alt="Image of product" style={{ height: '300px', marginRight: '20px' }}/>) 
                : ( <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt={product.name} /> )}
              <div className="product-details">
                <h4>{product.name}</h4>
                <p>Price: {product.price}</p>
                <button onClick={() => handleRemoveFromCart(product._id)} className="btn btn-danger">Remover do carrinho</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div class="text-center" style={{ marginBottom: '100px' }}>
        <button className="btn btn-success">Buy Now!</button>
      </div>
  </div>
);
};

export default Checkout;
