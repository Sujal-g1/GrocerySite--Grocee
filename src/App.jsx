import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Homepage from './components/Homepage.jsx';
import Vegetables from './components/Vegetables.jsx';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/vegetables" element={<Vegetables />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};

export default App;
