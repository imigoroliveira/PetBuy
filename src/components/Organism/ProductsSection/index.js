import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './style.css';
import { Buffer } from 'buffer';
import { SearchProduct } from '../../Molecula/SearchProduct';
import { SortProduct } from '../../Molecula/SortProduct';

export default function ProductsSection() {
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Getting all categories
        const categoriesResponse = await axios.get('http://localhost:3001/category/list');
        const categories = categoriesResponse.data;

        // Getting all products
        const productsResponse = await axios.get('http://localhost:3001/product/list');
        const products = productsResponse.data;

        // Grouping products by categories
        const groupedProducts = categories.map(category => ({
          category: category.name,
          products: products.filter(product => product.category === category._id),
        }));

        setGroupedProducts(groupedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on searchTerm
    const filtered = groupedProducts.map(group => ({
      ...group,
      products: group.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));

    setFilteredProducts(filtered);
  }, [searchTerm, groupedProducts]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSort = event => {
    setSortOption(event.target.value);
  };

  const sortedGroupedProducts = filteredProducts.map((group) => {
    let sortedProducts = group.products;
  
    if (sortOption === 'priceHigherToLower') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'priceLowertToHigher') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'name') {
      sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    return {
      ...group,
      products: sortedProducts,
    };
  });

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
    const updatedCartItems = Array.isArray(parsedCartItems) ? [...parsedCartItems] : [];

    const isProductAdded = Array.isArray(parsedCartItems) && parsedCartItems.includes(product._id);
    
    if (!isProductAdded) {
      updatedCartItems.push(product._id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      handleShowModal();
      console.log(localStorage);
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '50px' }}></div>
      <div className='row'>
        <div className='col cols-6'>
          <SearchProduct searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
        <div className='col cols-6'>
          <SortProduct sortOption={sortOption} onSort={handleSort} />
        </div>
      </div>
      {sortedGroupedProducts.map(group => (
        <div key={group.category}>
          <h4 style={{ textAlign: "center", marginBottom: "30px", marginTop: "40px" }}>{group.category}</h4>
          <div className="row row-cols-md-2 row-cols-lg-4 g-4">
            {group.products.map(product => (
              <div key={product._id} className="col-md-3">
                <div className="card product-card">
                  {product.image ? (
                    <img src={`data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`} alt="user-avatar" />
                   ) : (
                    <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt={product.name} />
                  )}
                                   <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: {product.price}</p>
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