import React from 'react';
import {
  BrowserRouter,
  Routes, Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from '../components/Layout';
import routes from '../utils/routes';
import { useAuth } from './hooks';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.rootPagePath()} element={<Layout />}>
        <Route
          index
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPagePath()} element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
