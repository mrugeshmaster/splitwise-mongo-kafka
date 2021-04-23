/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import {
  Row, Col, Dropdown, DropdownButton, Pagination, ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LeftSideBar from '../landing/LeftSideBar';
import NavBar from '../landing/NavBar';
import getActivityAction from '../../actions/activity/getActivityAction';
import RecentActivityCell from './RecentActivityCell';

export default function RecentActivity() {
  const groups = useSelector((st) => st.getGroupMembershipsReducer.groupMemberships);
  const activities = useSelector((state) => state.getActivityReducer.activities);
  const pageSizes = [2, 5, 10];
  const [pageSize, setPageSize] = useState(2);
  const [activePage, setActivePage] = useState(1);
  const [order, setOrder] = useState('DESC');
  const [groupName, setGroupName] = useState('ALL');

  const dispatch = useDispatch();

  useEffect(() => {
    const query = {
      order,
      pageSize,
      activePage,
      groupName,
    };
    dispatch(getActivityAction(query));
  }, [order, pageSize, activePage, groupName, dispatch]);

  const items = [];
  if (activities && activities.pages) {
    for (let number = 1; number <= activities.pages; number += 1) {
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
  }

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
            <Col className="mx-0 px-1" md="auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DropdownButton
                variant="outline-info"
                menuAlign="right"
                title="Page Size"
                id="dropdown-menu-align-right"
              >
                {pageSizes.map((ps) => (
                  <Dropdown.Item as="button" key={ps} value={ps} onClick={(e) => { setPageSize(e.target.value); setActivePage(1); }}>{ps}</Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col className="mx-0 px-1" md="auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DropdownButton
                variant="outline-info"
                menuAlign="right"
                title="Filter"
                id="dropdown-menu-align-right"
              >
                <Dropdown.Item as="button" key="ALL" value="All Groups" onClick={() => { setGroupName('ALL'); setActivePage(1); }}>All Groups</Dropdown.Item>
                {groups && groups.length > 0 && groups.map((group) => (
                  <Dropdown.Item as="button" key={group} value={group} onClick={() => { setGroupName(group); setActivePage(1); }}>{group}</Dropdown.Item>
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
                <Dropdown.Item
                  key="DESC"
                  as="button"
                  value="DESC"
                  onClick={() => { setOrder('DESC'); setActivePage(1); }}
                >
                  Newest
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  key="ASC"
                  value="ASC"
                  onClick={() => { setOrder('ASC'); setActivePage(1); }}
                >
                  Oldest
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activities?.pages > 1 && (
            <Pagination size="sm">
              {items}
            </Pagination>
            )}
          </Row>
          <Row>
            <ListGroup variant="flush" style={{ width: '100%' }}>
              {activities
                && activities.activities.length > 0 ? activities?.activities.map((activity) => (
                  <ListGroup.Item key={activity._id}>
                    <RecentActivityCell
                      activity={activity}
                    />
                  </ListGroup.Item>
                )) : (<h3 className="mt-3 text-muted">No Recent Activity</h3>)}
            </ListGroup>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
