import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../components/Atom/Title';
import { Buffer } from 'buffer';
import api from '../services/api';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/list/${id}`);

        if (response.status >= 200 && response.status <= 299) {
          const data = response.data;
          setProduct(data);
        } else {
          throw new Error('Failed to fetch product');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/category/list/${id}`);

        if (response.status >= 200 && response.status <= 299) {
          const data = response.data;
          setCategory(data.name);
        } else {
          throw new Error('Failed to fetch category');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, [id]);

  if (!product || !category) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (product) => {
    const existingCartItems = localStorage.getItem('cartItems');
    const parsedCartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
    const updatedCartItems = Array.isArray(parsedCartItems) ? [...parsedCartItems] : [];

    const isProductAdded = Array.isArray(parsedCartItems) && parsedCartItems.includes(product._id);

    if (!isProductAdded) {
      updatedCartItems.push(product._id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      console.log(localStorage);
    }
    alert("Product " + product.name + " added to cart!");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Title title="Detalhe de produto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center">
              <img src={`data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`} alt="user-avatar" />
            </div>
            <div className="col-md-6">
              <div>
                <h2>{product.name}</h2>
                <p>Categoria: {category}</p>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to cart</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;