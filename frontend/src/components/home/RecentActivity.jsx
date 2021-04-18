import React from 'react';
import { Redirect } from 'react-router';
import {
  Row, Col,
} from 'react-bootstrap';
import LeftSideBar from '../landing/LeftSideBar';
import NavBar from '../landing/NavBar';

export default function RecentActivity() {
  let redirectVar = null;
  if (!localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/" />;
  }

  return (
    <div>
      {redirectVar}
      <NavBar />
      <Row className="mt-5">
        <Col md={{ span: 2, offset: 1 }}>
          <LeftSideBar />
        </Col>
        <Col md={{ span: 6 }}>
          <Row>
            <Col>
              <h2>Recent Activity</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
