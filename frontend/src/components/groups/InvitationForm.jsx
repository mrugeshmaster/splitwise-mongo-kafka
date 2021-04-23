import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import SearchBar from '../SearchBar';

export default function InvitationForm(props) {
  const [email, setEmail] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const names = props.users && props.users.map((res) => res.name);

  const onChangeInvitationEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSearchName = async (name) => {
    if (!name) {
      setNameErrorMessage('Please search a Name of User');
    }
    const emailObj = props.users.find((res) => res.name === name);

    await props.addInvitedMembers(emailObj.email);

    setEmail(emailObj.email);
    setNameErrorMessage(null);
  };

  return (
    <Form.Row>
      <Form.Group as={Col} md="4">
        {names
        && (
        <SearchBar
          names={names}
          onSearchName={onSearchName}
        />
        )}
      </Form.Group>
      <Form.Group as={Col} md="4">
        <Form.Control
          type="email"
          name="invitationEmail"
          value={email}
          placeholder="Email"
          onChange={onChangeInvitationEmail}
        />
      </Form.Group>
      <Form.Group className="d-flex m-0 p-0">
        <Form.Group as={Col} md="auto ml-1 pl-1">
          <Button variant="outline-danger" id="cancel" onClick={props.onCancel}>
            <X />
          </Button>
        </Form.Group>
      </Form.Group>
      {nameErrorMessage}
    </Form.Row>
  );
}
