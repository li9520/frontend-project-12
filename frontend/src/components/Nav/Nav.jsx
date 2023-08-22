import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import React from 'react';

const NavBar = () => (
  <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <Container>
      <Row>
        <Col>
          <Link className="navbar-brand" to="/">Chat</Link>
        </Col>
      </Row>
    </Container>
  </Nav>
);

export default NavBar;
