import React, { useState, useLayoutEffect } from 'react';
import {
  Row, Col, Container, Alert,
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../landing/NavBar';
import GroupInvitation from './GroupInvitation';
import GroupMembership from './GroupMembership';
import LeftSideBar from '../landing/LeftSideBar';
import SearchBar from '../SearchBar';
import { getGroupInvites, getGroupMemberships } from '../../actions/groups/getGroupsActions';
import { resetGroupMessage } from '../../actions/groups/createGroupActions';

export default function Groups() {
  const [updated, setUpdated] = useState(false);
  const [groupSearchName, setGroupSearchName] = useState('');
  const [show, setShow] = useState(false);

  const groupInvites = useSelector((state) => state.getGroupInvitesReducer.groupInvites);
  const groupMemberships = useSelector((st) => st.getGroupMembershipsReducer.groupMemberships);
  const message = useSelector((state) => state.getGroupDetailsReducer.message);
  const dispatch = useDispatch();

  const onUpdateInvitation = () => {
    setUpdated(true);
  };

  const onSearchName = (groupName) => {
    setGroupSearchName(groupName);
  };

  useLayoutEffect(() => {
    dispatch(getGroupInvites());
    dispatch(getGroupMemberships());
    return (() => setUpdated(false));
  }, [dispatch, updated]);

  const hideAlert = () => {
    setShow(false);
    dispatch(resetGroupMessage());
  };

  let redirectVar = null;
  if (!localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/" />;
  }

  const showAlert = () => {
    setShow(true);
    dispatch(resetGroupMessage());
  };

  if (message === 'GROUP_LEAVE_ERROR') {
    showAlert();
  } else if (message === 'GROUP_LEAVE_SUCCESS') {
    dispatch(resetGroupMessage());
  }
  return (
    <div>
      {redirectVar}
      <NavBar />
      <div className="mt-5">
        <Row>
          <Col md={{ offset: 1, span: 2 }} className="flex-column">
            <LeftSideBar />
          </Col>
          <Col>
            {groupMemberships.length > 0 && (
            <Row>
              <Col md={6} className="pt-2">
                <SearchBar
                  names={groupMemberships.map((member) => member.groupName)}
                  onSearchName={onSearchName}
                  onUpdateInvitation={onUpdateInvitation}
                />
              </Col>
              <Col md={1} className="p-0">
                <Link
                  key={groupSearchName}
                  className="nav-link"
                  to={`/groupdetails/${groupSearchName}`}
                >
                  <ArrowRightSquareFill size="38px" />
                </Link>
              </Col>
            </Row>
            )}
            <Row>
              <Col md={6} className="pr-2 pt-2">
                {show && (
                  <Alert variant="danger" onClose={hideAlert} dismissible>
                    Please settle all balances before leaving group
                  </Alert>
                )}
              </Col>
            </Row>
            {groupInvites.message === 'NO_INVITATIONS' && groupMemberships.message === 'NO_MEMBERSHIPS' && (
              <h3 className="mt-3 text-muted"> Create A New Group !! </h3>
            )}
            {groupInvites.length > 0 && (
            <Col md={{ span: 8 }} className="mt-4">
              <h3>Group Invitations</h3>
              <div className="my-5">
                <Container className="d-flex flex-wrap">
                  {groupInvites.map((groupInvite) => (
                    <GroupInvitation
                      key={groupInvite.groupName}
                      groupInvite={groupInvite}
                      onUpdateInvitation={onUpdateInvitation}
                    />
                  ))}
                </Container>
              </div>
            </Col>
            )}
            {groupMemberships.length > 0 && (
            <Col md={{ span: 8 }} className="mt-4">
              <h3>Group Membership</h3>
              <div className="my-5">
                <Container className="d-flex flex-wrap">
                  {groupMemberships.map((groupMembership) => (
                    <GroupMembership
                      key={groupMembership.groupName}
                      groupMembership={groupMembership}
                      onUpdateInvitation={onUpdateInvitation}
                    />
                  ))}
                </Container>
              </div>
            </Col>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
