import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Container, Form, Button, Row, Col,
} from 'react-bootstrap';
import userSignUp from '../../actions/account/signUpUserAction';
import NavBar from '../landing/NavBar';
import SplitwiseImage from '../../images/logo.svg';

export default function SignUp() {
  const user = useSelector((state) => state.signup.user);
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      const data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      };

      dispatch(userSignUp(data));
    }
  };

  const handleClear = () => {
    setInputs(() => ({
      name: '',
      email: '',
      password: '',
    }));
  };

  let redirectVar = null;
  let message = '';
  if (user.message === 'NEW_USER_CREATED') {
    localStorage.setItem('name', user.name);
    localStorage.setItem('idToken', user.idToken);
    redirectVar = <Redirect to="/home" />;
  } else if (user.message === 'USER_ALREADY_EXISTS') {
    message = 'User with email id is already registered';
  }

  return (
    <div>
      {redirectVar}
      <NavBar />
      <Container>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col xs lg="2">{'\u00A0'}</Col>
          <Col>
            <img src={SplitwiseImage} className="img-fluid rounded float-right" style={{ height: 200, width: 200 }} alt="Splitwise" />
          </Col>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div style={{ color: '#ff0000' }}>{message}</div>
              <Form.Group controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={inputs.name}
                  placeholder="Enter Name"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a Name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={inputs.email}
                  placeholder="Enter email"
                  onChange={handleChange}
                  pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={inputs.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Submit
              </Button>
            &nbsp;&nbsp;
              <Button variant="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Form>
          </Col>
          <Col xs lg="2">{'\u00A0'}</Col>
        </Row>

      </Container>
    </div>
  );
}
