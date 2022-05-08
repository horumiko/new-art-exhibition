import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './application/App';
import ImageZoom from './application/components/ImageZoom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="valley" element={<ImageZoom item='0' name='Magical Valley'/>} />
      <Route path="safari" element={<ImageZoom item='1'/>} />
    </Routes>
  </BrowserRouter>
);
