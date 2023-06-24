import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const localStorageItems = JSON.parse(localStorage.getItem('cartItems')) || {};
        const productIds = Object.keys(localStorageItems);
        const fetchedProducts = await Promise.all(
          productIds.map((id) =>
            axios.get(`http://localhost:3001/product/list/${id}`).then((res) => res.data)
          )
        );
        const cartItemsWithQuantity = fetchedProducts.map((product) => ({
          ...product,
          quantity: localStorageItems[product.id].quantity, // Altere "_id" para "id"
        }));
        setCartItems(cartItemsWithQuantity);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  function calculateTotalPrice() {
    let total = 0;
    for (const product of cartItems) {
      total += product.price * product.quantity;
    }
    return total;
  }

  const navigate = useNavigate();

  function updateLocalStorage(updatedCartItems) {
    const localStorageItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    updatedCartItems.forEach((item) => {
      localStorageItems[item._id] = { quantity: item.quantity };
    });
    localStorage.setItem('cartItems', JSON.stringify(localStorageItems));
  }

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((product) => {
      if (product._id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const decodedToken = jwt(storedToken);
        const userId = localStorage.getItem('_id');

        axios
          .get(`http://localhost:3001/client/list/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((response) => {
            const customer = response.data;
            const totalPrice = calculateTotalPrice();

            const order = {
              code: decodedToken.code,
              totalPrice: totalPrice,
              products: cartItems.map((product) => ({
                product: product.id,
                quantity: product.quantity,
              })),
              client: customer._id,
              orderDate: new Date(),
              status: 'pending',
              creditCardName: customer.creditCardName,
              creditCardNumber: customer.creditCardNumber,
              creditCardCvc: customer.creditCardCvc,
              address: customer.address,
            };

            axios
              .post('http://localhost:3001/order/create', order, {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              })
              .then((response) => {
                console.log(response.data);
                alert('Order placed successfully!');
              })
              .catch((error) => {
                console.error(error);
                alert('Error placing the order. Please try again.');
              });
          })
          .catch((error) => {
            console.error(error);
            alert('Error getting customer details. Please try again.');
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('User not authenticated! Please log in!');
      navigate('/login');
    }
  }

  return (
    <div className="container">
      <br />
      <br />

      <div className="row">
        <div className="col-md-8">
          <h3>Products added to Cart:</h3>
          {cartItems.length === 0 ? (
            <p>No product in cart</p>
          ) : (
            <ul className="cart-items">
              {cartItems.map((product) => (
                <li key={product._id} className="cart-item d-flex align-items-center mb-3">
                  {product.image ? (
                    <img
                      src={`data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`}
                      alt="Image of product"
                      style={{ height: '300px', marginRight: '20px' }}
                    />
                  ) : (
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                      alt={product.name}
                    />
                  )}
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <div>
                      <button onClick={() => handleIncreaseQuantity(product._id)}>+</button>
                      <button onClick={() => handleDecreaseQuantity(product._id)}>-</button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(product._id)}
                      className="btn btn-danger"
                    >
                      Remove from Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-4">
          {customer && (
            <div>
              <h4>Payment Method:</h4>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                Credit Card Name:{' '}
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{customer.creditCardName}</span>
                <br />
                Credit Card Number:{' '}
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{customer.creditCardNumber}</span>
              </p>
              <h4>
                Shipping Address:<br />
                <span style={{ fontSize: '15px' }}>Address:</span>{' '}
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{customer.address}</span>
              </h4>
            </div>
          )}
        </div>
      </div>

      <div className="text-center" style={{ marginBottom: '100px' }}>
        <button type="submit" className="btn btn-success" onClick={handleSubmit}>
          Buy Now!
        </button>
        <h2>Total: R$ {calculateTotalPrice().toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default Checkout;
