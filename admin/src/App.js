// import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Sidebar from './global/Sidebar';
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Login from './pages/login';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
