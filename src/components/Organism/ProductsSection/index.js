import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './style.css';
import { Buffer } from 'buffer';

export default function ProductsSection() { 
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Getting all categories 
        const categoriesResponse = await axios.get('http://localhost:3001/category/list');
        const categories = categoriesResponse.data;
       
        //Getting all products 
        const productsResponse = await axios.get('http://localhost:3001/product/list');
        const products = productsResponse.data;

        //Grouping products by categories
        const groupedProducts = categories.map(category => ({
          category: category.name,
          products: products.filter(product => product.category === category._id)
        }));

        setGroupedProducts(groupedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleAddToCart = (product) => {
    const existingCartItems = localStorage.getItem('cartItems');
    const parsedCartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
    const isProductAdded = parsedCartItems.some((itemId) => itemId === product._id);
  
    if (!isProductAdded) {
      parsedCartItems.push(product._id);
      localStorage.setItem('cartItems', JSON.stringify(parsedCartItems));
      handleShowModal();
      console.log(localStorage);
    }
  };

  
  Modal.setAppElement('#root');

  return (
    <div className="container">
      {groupedProducts.map(group => (
        <div key={group.category}>
          <h4 style={{ textAlign: "center", marginBottom: "30px", marginTop: "40px" }}>{group.category}</h4>
          <div className="row">
            {group.products.map(product => (
              <div key={product._id} className="col-md-3">
                <div className="card" style={{ width: "15rem"}}>
                  {console.log(product.image.data)}
                  {product.image ? (
                    <img src={`data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`} alt="user-avatar" />
                   ) : (
                    <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt={product.name} />
                  )}
                                   <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Preço: {product.price}</p>
                    {/* Outras informações do produto */}
                    <a onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to cart</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {showModal && (
        <Modal isOpen={showModal} onRequestClose={handleCloseModal} className="cartmodal" overlayClassName="overlay">
          <h2>Produto Adicionado ao Carrinho!</h2>
          <button onClick={handleCloseModal}>Fechar</button>
        </Modal>
      )}
    </div>
  );
}