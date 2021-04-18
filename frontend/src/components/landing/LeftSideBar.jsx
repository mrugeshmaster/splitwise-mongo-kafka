import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroupMemberships } from '../../actions/groups/getGroupsActions';

export default function LeftSideBar() {
  let groupLinks = [];
  const groupList = useSelector((state) => state.getGroupMembershipsReducer.groupMemberships);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupMemberships());
  }, [dispatch]);

  if (groupList && groupList.length > 0) {
    groupLinks = groupList.map((groupName) => (
      <Link key={groupName} className="nav-link" to={`/groupdetails/${groupName}`}>
        {groupName}
      </Link>
    ));
  }
  return (
    <Nav defaultActiveKey="/home" className="flex-column mt-3">
      <Link className="nav-link" to="/home">Dashboard</Link>
      <Link className="nav-link" to="/groups">My Groups</Link>
      <Link className="nav-link" to="/recentactivity">Recent Activity</Link>
      <hr />
      <div className="px-3 text-muted">Groups</div>
      {groupLinks}
    </Nav>
  );
}
