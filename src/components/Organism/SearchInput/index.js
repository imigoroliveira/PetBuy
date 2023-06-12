export default function SearchInput() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Pesquisar produto" />
            </div>
            <div className="col-md-2 col-sm-12 d-flex align-items-center justify-content-end text-end">
                <select className="form-select">
                    <option value="">Filtrar por...</option>
                    <option value="precoMaiorMenor">Preço (maior &gt; menor)</option>
                    <option value="precoMenorMaior">Preço (menor &gt; maior)</option>
                    <option value="nome">Nome</option>
                </select>
            </div>
        </div>
    </div>
    )
}