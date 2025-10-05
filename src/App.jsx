import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Homepage from './components/Homepage.jsx';
import Vegetables from './components/Vegetables.jsx';
import Fruits from './components/Fruits.jsx';
import Dairy from './components/dairy.jsx';
import Atta from './components/atta&dal.jsx';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx'

import TrackOrder from './components/TrackOrder.jsx';

import "leaflet/dist/leaflet.css";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/vegetables" element={<Vegetables />} />
      <Route path="/fruits" element={<Fruits />} />
      <Route path="/dairy" element={<Dairy />} />
      <Route path="/atta&dal" element={<Atta />} />
      <Route path="/products" element={<Products />} />
      <Route path="/track-order" element={<TrackOrder />} />
    </Routes>
  );
};

export default App;
