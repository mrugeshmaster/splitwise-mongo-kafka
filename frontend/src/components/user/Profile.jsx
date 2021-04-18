/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, Form, Button, Image,
} from 'react-bootstrap';
import NavBar from '../landing/NavBar';
import timezones from '../utils/timezones';
import { getUser, updateUser, updateUserImage } from '../../actions/user/userProfileActions';

export default function Profile() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const user = useSelector((state) => state.userProfile.user);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    currency: '',
    timezone: '',
    image: '',
    message: '',
    file: null,
    filename: null,
  });

  const fetchUser = useCallback(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
    setInputs(() => ({
      name: user.name,
      email: user.email,
      phone: user.phone,
      language: user.language,
      currency: user.currency,
      timezone: user.timezone,
      image: user.image,
      message: user.message,
    }));
  }, [dispatch,
    fetchUser,
    user.currency,
    user.email,
    user.image,
    user.language,
    user.message,
    user.name,
    user.phone,
    user.timezone]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const onSave = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      dispatch(updateUser(inputs));
    }
  };

  const onAvatarChange = (e) => {
    setInputs((input) => (
      {
        ...input,
        file: e.target.files[0],
        filename: e.target.files[0].name,
      }));
  };

  const onUpload = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      const data = inputs.file;
      dispatch(updateUserImage(data));
    }
  };

  let redirectVar = null;
  if (!localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/" />;
  }
  if (user.message === 'PROFILE_UPDATE_SUCCESS') {
    localStorage.setItem('name', user.name);
    redirectVar = <Redirect to="/home" />;
  }
  let image = null;
  let filename = inputs.filename || 'Choose your Avatar';
  if (user.message === 'PROFILE_UPDATE_IMAGE_SUCCESS') {
    filename = 'Choose your Avatar';
  }
  if (inputs.image) {
    image = inputs.image;
  }
  return (
    <div>
      {redirectVar}
      <NavBar />
      <div className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <h4>Your Account</h4>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={{ span: 3, offset: 1 }}>
            <Form noValidate validated={validated} onSubmit={onUpload}>
              <Form.Row>
                <Form.Group as={Col} md={{ span: 3, offset: 1 }}>
                  <Image style={{ width: '17rem' }} src={image} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={3}>
                  <Form.File
                    className="mt-3"
                    name="image"
                    id="image"
                    style={{ width: '21rem' }}
                    accept="image/*"
                    label={filename}
                    onChange={onAvatarChange}
                    custom
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please upload an Avatar.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row className="d-flex" style={{ justifyContent: 'flex-end' }}>
                <Form.Group as={Col} md={3}>
                  <Button variant="info" type="submit">Upload</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
          <Col md={{ offset: 1 }} className="mt-5 pt-5">
            <Form noValidate validated={validated} onSubmit={onSave}>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={inputs.name}
                    onChange={onChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;
                <Form.Group as={Col} md="4">
                  <Form.Label>Your Default Currency</Form.Label>
                  <Form.Control
                    name="currency"
                    as="select"
                    value={inputs.currency}
                    defaultValue="DEFAULT"
                    onChange={onChange}
                  >
                    <option value="USD">USD</option>
                    <option value="KWD">KWD</option>
                    <option value="BHD">BHD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select a currency.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Your Email Address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={inputs.email}
                    onChange={onChange}
                    defaultValue="DEFAULT"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;
                <Form.Group as={Col} md="4">
                  <Form.Label>Your Time Zone</Form.Label>
                  <Form.Control
                    name="timezone"
                    as="select"
                    value={inputs.timezone}
                    defaultValue="DEFAULT"
                    onChange={onChange}
                  >
                    {timezones.map((timezone) => (
                      <option key={timezone.value} value={timezone.key}>{timezone.value}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select a timezone.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Your Phone Number</Form.Label>
                  <Form.Control
                    name="phone"
                    type="text"
                    value={inputs.phone}
                    onChange={onChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a phone number.
                  </Form.Control.Feedback>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;
                <Form.Group as={Col} md="4">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    name="language"
                    as="select"
                    value={inputs.language}
                    defaultValue="en"
                    onChange={onChange}
                  >
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="it">Italiano</option>
                    <option value="ja">日本語</option>
                    <option value="nl">Nederlands</option>
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="pt-PT">Português (Portugal)</option>
                    <option value="sv">Svenska</option>
                    <option value="th">ภาษาไทย</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select a language.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={{ span: 4, offset: 7 }}>
                  <Button variant="info" type="submit" style={{ width: '4.5rem' }}>Save</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
