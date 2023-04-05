/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     
        <GoogleOAuthProvider clientId="1011871039879-pnkldg4o2pqdkr8k8a6is0r4258d9ldf.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
    
  </React.StrictMode>,
);
