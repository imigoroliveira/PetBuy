import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    }, 3000);
  };

  const handleAddToCart = (product) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = [...existingCartItems, product];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    handleShowModal();
  };


  return (
    <div className="container">
      {groupedProducts.map(group => (
        <div key={group.category}>
          <h4 style={{ textAlign: "center", marginBottom: "30px", marginTop: "40px" }}>{group.category}</h4>
          <div className="row">
            {group.products.map(product => (
              <div key={product._id} className="col-md-3">
                <div className="card" style={{ width: "18rem" }}>
                  {console.log(product.image.data)}
                  {product.image ? (
                    <img src={'data:image/jpeg;base64,'+ btoa (String.fromCharCode(...product.image.data))} alt="user-avatr" />                    ) : (
                    <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt={product.name} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Preço: {product.price}</p>
                    {/* Outras informações do produto */}
                    <a href="#" className="btn btn-primary">Add to cart</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {showModal && (
        <div className="modal">
          <h2>Produto Adicionado ao Carrinho!</h2>
        </div>
      )}
    </div>
  );
}