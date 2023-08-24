import React, { useState, useMemo } from 'react';
import AuthContext from '../contexts';

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token') || null;
  const [loggedIn, setLoggedIn] = useState(!!token);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
