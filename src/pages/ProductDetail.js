import React from 'react';
import Title from '../components/Atom/Title';

function ProductDetail() {
    const product = {
        image: 'caminho/para/imagem.jpg',
        name: 'Nome do Produto',
        category: 'Categoria do Produto',
        description: 'Descrição do Produto',
        total: 10,
        rating: 4.5,
        quantity: 20,
      };

    return (
        <div class="row">
            <div class="col">     
                <div class="row">
                    <div class="col">
                        <Title title="Detalhe de produto"></Title> 
                    </div>
                </div>
                <div class="row">
                    <div className="col-md-6">
                        <img src={product.image} alt={product.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h2>{product.name}</h2>
                            <p>Categoria: {product.category}</p>
                            <p>Descrição: {product.description}</p>
                            <p>Total: {product.total}</p>
                            <p>Nota: {product.rating}</p>
                            <p>Quantidade: {product.quantity}</p>
                            <button className="btn btn-primary">Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        //Comentario
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail;