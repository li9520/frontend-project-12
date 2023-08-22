import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Nav';

const Layout = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Nav />
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
