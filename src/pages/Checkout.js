import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const localStorageItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const productIds = localStorageItems.map(item => item.productId); // Obtém os IDs dos produtos do carrinho
        const fetchedProducts = await Promise.all(
          productIds.map(id =>
            axios.get(`http://localhost:3001/product/list/${id}`).then(res => res.data)
          )
        );
        const cartItemsWithQuantity = fetchedProducts.map((product, index) => ({
          ...product,
          quantity: localStorageItems[index].quantity // Adiciona a quantidade aos produtos
        }));
        setCartItems(cartItemsWithQuantity);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  function calculateTotal() {
    let total = 0;
    for (const product of cartItems) {
      total += product.price * product.quantity;
    }
    return total;
  }

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const data = jwt(storedToken);
        const _id = localStorage.getItem("_id");
        //Getting user information to complete order
        axios.get(`http://localhost:3001/client/list/${_id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })
          .then((response) => {
            const client = response.data;
            const order = {
              codigo:"1",
              totalPrice: calculateTotal(),
              products: cartItems.map((item) => ({
                product: item._id,
                quantity: item.quantity,
              })),
              client: client._id,
              dateOrder: new Date(),
              status: "Aguardando Pagamento",
              creditCardName: client.creditCardName,
              creditCardNumber:  client.creditCardNumber, 
              creditCardCvc:  client.creditCardCvc, 
              address:  client.address, 
            };

            axios.post("http://localhost:3001/order/create/", order, {
              headers: {
                Authorization: `Bearer ${storedToken}`
              }
            })
              .then((response) => {
                console.log(response.data);
                alert("Pedido efetuado com sucesso!");
              })
              .catch((error) => {
                console.error(error);
                alert("Erro ao efetuar o pedido. Por favor, tente novamente.");
              });
          })
          .catch((error) => {
            console.error(error);
            alert("Erro ao obter os detalhes do cliente. Por favor, tente novamente.");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Usuário não autenticado! Por favor, faça o login!');
      navigate("/login");
    }
  }

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

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  
    const localStorageItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedLocalStorageItems = localStorageItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedLocalStorageItems));
  };
  return (
    <div className="container">
      <br /> <br />

      <h3>Products added to Cart:</h3>
      {cartItems.length === 0 ? (
        <p>No product in cart</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((product) => (
            <li key={product._id} className="cart-item d-flex align-items-center mb-3">
              {product.image ? (
                <img src={`data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`} alt="Image of product" style={{ height: '300px', marginRight: '20px' }} />)
                : (<img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt={product.name} />)}
              <div className="product-details">
                <h4>{product.name}</h4>
                <p>Price: {product.price}</p>
                <div>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleUpdateQuantity(product._id, product.quantity - 1)}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleUpdateQuantity(product._id, product.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveFromCart(product._id)} className="btn btn-danger">Remover do carrinho</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="text-center" style={{ marginBottom: '100px' }}>
        <button type="submit" className="btn btn-success" onClick={handleSubmit}>Buy Now!</button>
      </div>
    </div>
  );
}

export default Checkout;
