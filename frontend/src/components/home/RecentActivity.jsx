import React, { useState } from 'react';
import { Redirect } from 'react-router';
import {
  Row, Col, Dropdown, DropdownButton, Pagination,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LeftSideBar from '../landing/LeftSideBar';
import NavBar from '../landing/NavBar';

export default function RecentActivity() {
  const groups = useSelector((st) => st.getGroupMembershipsReducer.groupMemberships);
  const [pageSize, setPageSize] = useState(2);
  const [activePage, setActivePage] = useState(1);
  let redirectVar = null;
  if (!localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/" />;
  }
  console.log(pageSize, activePage);
  const items = [];
  for (let number = 1; number <= pageSize; number += 1) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        value={number}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>,
    );
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
            <Col className="mx-0 px-1" md="auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DropdownButton
                variant="outline-info"
                menuAlign="right"
                title="Page Size"
                id="dropdown-menu-align-right"
              >
                <Dropdown.Item as="button" value="2" onClick={(e) => setPageSize(e.target.value)}>2</Dropdown.Item>
                <Dropdown.Item as="button" value="5" onClick={(e) => setPageSize(e.target.value)}>5</Dropdown.Item>
                <Dropdown.Item as="button" value="10" onClick={(e) => setPageSize(e.target.value)}>10</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col className="mx-0 px-1" md="auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DropdownButton
                variant="outline-info"
                menuAlign="right"
                title="Filter"
                id="dropdown-menu-align-right"
              >
                {groups && groups.length > 0 && groups.map((group) => (
                  <Dropdown.Item as="button" value={group}>{group}</Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col className="mx-0 px-1" md="auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DropdownButton
                variant="outline-info"
                menuAlign="right"
                title="Sort"
                id="dropdown-menu-align-right"
              >
                <Dropdown.Item as="button" value="DESC">Newest</Dropdown.Item>
                <Dropdown.Item as="button" value="ASC">Oldest</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Pagination size="sm">
              {items}
            </Pagination>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
