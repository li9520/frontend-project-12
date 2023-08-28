import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Nav';

const Layout = () => (
  <div className="d-flex flex-column vh-100">
    <Nav />
    <Outlet />
  </div>
);

export default Layout;
