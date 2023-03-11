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
import Adminauth from './auth/adminauth';

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
              <Route path="/catagory" element={<Catagory />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
