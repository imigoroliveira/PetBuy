import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import EditClient from './pages/EditClient';

export default function RoutesConfig() {
    return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/productDetail' element={<ProductDetail/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/editClient' element={<EditClient/>} />

      </Routes>
    );
  }