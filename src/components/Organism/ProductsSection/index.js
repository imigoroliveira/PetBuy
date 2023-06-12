import { Button } from "bootstrap";
import ButtonBase from "../../Atom/ButtonBase";

export default function ProductsSection() {
    const products = [
        { id: 1, name: 'Produto 1', category: 'Categoria 1', price: 10 },
        { id: 2, name: 'Produto 2', category: 'Categoria 1', price: 20 },
        { id: 3, name: 'Produto 3', category: 'Categoria 2', price: 15 },
        { id: 4, name: 'Produto 4', category: 'Categoria 2', price: 25 },
      ];


    const groupedProducts = {};
      products.forEach((product) => {
        if (groupedProducts[product.category]) {
          groupedProducts[product.category].push(product);
        } else {
          groupedProducts[product.category] = [product];
        }
    });
    
  return (
  <div className="container">
    {Object.keys(groupedProducts).map((category) => (
    <div key={category}>
      <h4 style={{ textAlign: "center", marginBottom: "30px", marginTop: "40px" }}>{category}</h4>
      <div className="row">
        {groupedProducts[category].map((product) => (
          <div key={product.id} className="col-md-3">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text">Preço: {product.price}</p>
                <ButtonBase title="Ver mais..."/>
                <br></br>
                <ButtonBase title="Adiconar no carrinho"/>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    ))}
  </div>
  )
}