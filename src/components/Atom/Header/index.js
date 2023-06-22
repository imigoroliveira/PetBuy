import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
  const fullName = localStorage.getItem('fullName');

  // Function to clean localStorage
  const handleLogout = () => {
    localStorage.removeItem('fullName');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light text-white" style={{ backgroundColor: "#3597d8" }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="./../assets/images/logo_min_long.png" width="260px" height="70px" alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {fullName && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/checkout">Checkout</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/editClient">Edit Client</Link>
                </li>
                <li className="nav-item">
                  <div className="d-flex flex-column align-items-center">
                    <span className="nav-text-bold nav-logged-user">Usuário logado: {fullName}</span>
                    <button className="btn btn-link text-white" onClick={handleLogout}>Sair</button>
                  </div>
                </li>
              </>
            )}
            {!fullName && (
              <>
                 <li className="nav-item">
                  <Link className="nav-link" to="/login">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/checkout">Checkout</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/editClient">Edit Client</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
