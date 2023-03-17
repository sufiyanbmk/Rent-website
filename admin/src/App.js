// import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Login from './pages/login';
import Catagory from './pages/catagory';
import Product from './pages/products';
import Adminauth from './auth/adminauth';
import AddProduct from './pages/products/addProduct';

function App() {
  return (
    <div className="app">
      <main className="content">
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Adminauth />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Product />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/catagory" element={<Catagory />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
