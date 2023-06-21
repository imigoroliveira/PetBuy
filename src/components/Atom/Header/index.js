import "./header.css";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
  <nav class="navbar navbar-expand-lg navbar-light text-white" style={{ backgroundColor: "#3597d8" }}>
        <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="./../assets/images/logo_min_long.png"  width="260px" height="70px" alt="Logo" />
        </a>            
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/checkout">Checkout</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}