import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

export default function ProductsSection() { 
  const [groupedProducts, setGroupedProducts] = useState([]);

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


  return (
    <div className="container">
      {groupedProducts.map(group => (
        <div key={group.category}>
          <h4 style={{ textAlign: "center", marginBottom: "30px", marginTop: "40px" }}>{group.category}</h4>
          <div className="row">
            {group.products.map(product => (
              <div key={product._id} className="col-md-3">
                <div className="card" style={{ width: "18rem" }}>
                  {console.log(product.image)}
                  {product.image ? (
                    <img src={`http://localhost:3001/uploads/${atob(Buffer.from(product.image).toString('base64'))}`} alt={product.name} />
                  ) : (
                    <img src="fallback-image.jpg" alt={product.name} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Preço: {product.price}</p>
                    {/* Outras informações do produto */}
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}