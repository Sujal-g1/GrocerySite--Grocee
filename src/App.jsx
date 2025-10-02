import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import Checkout from './components/Checkout.jsx';
import Homepage from './components/Homepage.jsx';
import Vegetables from './components/Vegetables.jsx';
import Products from './components/Products.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/vegetables" element={<Vegetables />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};

export default App;
