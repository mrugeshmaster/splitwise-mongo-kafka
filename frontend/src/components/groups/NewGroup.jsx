import React, { useEffect, useState } from 'react';
import {
  Row, Col, Form, Button, Image, Alert,
} from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@material-ui/core';
import NavBar from '../landing/NavBar';
import {
  getAllUsers, createGroup, uploadGroupImage, resetGroupMessage,
} from '../../actions/groups/createGroupActions';
import InvitationForm from './InvitationForm';

export default function NewGroup() {
  const [imageFormValidated, setImageFormValidated] = useState(false);
  const [saveFormValidated, setSaveFormValidated] = useState(false);
  const [invitationListSize, setInvitationListSize] = useState(1);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupImageFile, setGroupImageFile] = useState(null);
  const [groupImageFileName, setGroupImageFileName] = useState('Choose your Avatar');
  const [groupImageFileURL, setGroupImageFileURL] = useState('https://splitwise-imagestore.s3-us-west-2.amazonaws.com/groupImages/groupPlaceholder.png');

  const dispatch = useDispatch();
  const message = useSelector((state) => state.createGroupReducer.message);
  const groupImageDetails = useSelector((state) => state.createGroupReducer.groupImageDetails);
  const users = useSelector((state) => state.getAllUsersReducer.users);

  useEffect(() => {
    dispatch(resetGroupMessage());
    dispatch(getAllUsers());
    if (groupImageDetails && groupImageDetails.message === 'IMAGE_UPLOADED') {
      setGroupImageFileURL(groupImageDetails.groupImageURL);
      groupImageDetails.message = '';
    }
  }, [dispatch, groupImageDetails, message]);
  const onSave = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setSaveFormValidated(true);
    } else {
      e.preventDefault();
      const data = {
        groupName,
        invitedMembers,
        groupImage: groupImageFileURL,
      };
      setSaveFormValidated(true);
      dispatch(createGroup(data));
    }
  };

  const onUpload = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setImageFormValidated(true);
    } else {
      e.preventDefault();
      const data = {
        groupImage: groupImageFile,
      };
      dispatch(uploadGroupImage(data));
    }
  };

  let selfMember = null;
  const invitationForms = [];
  let errorMessage = null;

  if (message === 'DUPLICATE_GROUP') {
    errorMessage = <Alert variant="danger">Group Name Taken. Please enter unique group name.</Alert>;
  }
  selfMember = (
    <Form.Row>
      <Form.Group as={Col} md="4">
        <Form.Control type="text" name="invite_name" placeholder={localStorage.getItem('name')} disabled />
      </Form.Group>
      <Form.Group as={Col} md="4">
        <Form.Control type="email" name="invite_email" placeholder={localStorage.getItem('email')} disabled />
      </Form.Group>
    </Form.Row>
  );

  const onCancel = () => {
    setInvitationListSize(invitationListSize - 1);
  };

  const addInvitedMembers = async (invitedMember) => {
    setInvitedMembers([...invitedMembers, invitedMember]);
  };

  const onGroupImageChange = (e) => {
    setGroupImageFile(e.target.files[0]);
    setGroupImageFileName(e.target.files[0].name);
  };

  if (users && users.length > 0) {
    for (let i = 1; i <= invitationListSize; i += 1) {
      invitationForms.push(
        <InvitationForm
          key={i}
          users={users}
          invitedMembers={invitedMembers}
          addInvitedMembers={addInvitedMembers}
          groupName={groupName}
          onCancel={onCancel}
        />,
      );
    }
  }
  let redirectVar = null;
  if (!localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/" />;
  }
  if (message === 'GROUP_CREATED') {
    redirectVar = <Redirect to="/" />;
  }

  return (
    <div>
      {redirectVar}
      <NavBar />
      <div className="mt-5">
        <Row>
          <Col md={{ span: 3, offset: 2 }}>
            <Form noValidate validated={imageFormValidated} onSubmit={onUpload}>
              <Form.Row className="mt-4">
                <Form.Group as={Col} md={3}>
                  <Image style={{ width: '17rem' }} src={groupImageFileURL} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={3}>
                  <Form.File
                    className="mt-3"
                    name="image"
                    id="image"
                    style={{ width: '17rem' }}
                    accept="image/*"
                    label={groupImageFileName}
                    onChange={onGroupImageChange}
                    custom
                  />
                  <Form.Control.Feedback type="invalid">
                    Please upload a group image.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={3} className="d-flex" style={{ justifyContent: 'flex-end' }}>
                  <Button type="submit">Upload</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
          <Col md={{ span: 6 }}>
            <h5 className="text-muted">START A NEW GROUP</h5>
            <div as={Col} md={{ span: 2 }}>
              {errorMessage}
            </div>
            <Form noValidate validated={saveFormValidated}>
              <Form.Row>
                <Form.Group as={Col} md={4}>
                  <Form.Control
                    type="text"
                    name="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a group name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            </Form>
            <Divider />
            <h5 className="text-muted">GROUP MEMBERS</h5>
            <Form onSubmit={onSave}>
              {selfMember}
              {invitationForms}
              <Form.Row>
                <Form.Group as={Col}>
                  <Button
                    onClick={() => setInvitationListSize(invitationListSize + 1)}
                  >
                    + Add a Person
                  </Button>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  {/* <Link to="/home"> */}
                  <Button type="submit">Save</Button>
                  {/* </Link> */}
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
