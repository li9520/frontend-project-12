import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './App';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import store from './slices/index.js';
import SocketProvider from './providers/SocketProvider/SocketProvider';

const app = () => {
  const root = createRoot(document.getElementById('chat'));
  const socket = io();
  root.render(
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SocketProvider>
    </Provider>,
  );
};

app();
