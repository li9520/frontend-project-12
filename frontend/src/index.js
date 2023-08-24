import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import AuthProvider from './providers/AuthProvider';

const root = createRoot(document.getElementById('chat'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
