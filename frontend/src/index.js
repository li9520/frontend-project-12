import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import store from './slices/index.js';

const app = () => {
  const root = createRoot(document.getElementById('chat'));
  root.render(
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>,
  );
};

app();
