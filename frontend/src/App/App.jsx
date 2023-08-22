import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from '../components/Layout';
import routes from '../utils/routes';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.rootPagePath()} element={<Layout />}>
        <Route index element={<ChatPage />} />
        <Route path={routes.loginPagePath()} element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
