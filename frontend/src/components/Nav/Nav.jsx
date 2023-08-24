import { Link } from 'react-router-dom';
import { Navbar, Button, Container } from 'react-bootstrap';
import React from 'react';
import useAuth from '../../App/hooks';

const NavBar = () => {
  const auth = useAuth();
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm  bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">Chat</Navbar.Brand>
        {auth.loggedIn
          && <Button onClick={auth.logOut}>Log out</Button> }
      </Container>
    </Navbar>
  );
};

export default NavBar;
