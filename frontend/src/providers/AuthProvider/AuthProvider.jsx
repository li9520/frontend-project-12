import React, { useState, useMemo, useCallback } from 'react';
import { AuthContext } from '../../contexts';

const AuthProvider = ({ children }) => {
  const currentUser = localStorage.getItem('username') || null;
  const [loggedIn, setLoggedIn] = useState(!!currentUser);

  const logIn = (payload) => {
    const { username, token } = payload;
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  const getUser = useCallback(() => (loggedIn ? localStorage.getItem('username') : null), [loggedIn]);

  const value = useMemo(() => ({
    loggedIn, logIn, logOut, getUser,
  }), [loggedIn, getUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
