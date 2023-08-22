import React from 'react';
import {
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import LoginForm from './components/LoginForm';

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center vh-100">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <LoginForm />
          </Card.Body>
          {/* <Card.Footer className="p-4">
              <div className="text-center">
                <span>span</span>
                <Link to="/signup">Link</Link>
              </div>
  </Card.Footer> */}
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
