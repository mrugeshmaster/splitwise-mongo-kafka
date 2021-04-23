import React from 'react';
import {
  Button, Card,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { groupLeave } from '../../actions/groups/groupDetailsActions';

export default function GroupMembership(props) {
  const dispatch = useDispatch();

  const { groupName } = props.groupMembership;

  const onLeave = (e) => {
    e.preventDefault();
    dispatch(groupLeave(groupName));
    props.onUpdateInvitation();
  };

  return (
    <div>
      <Card className="m-2" style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          style={{ width: '100%', height: '60%' }}
          src={props.groupMembership.groupImage}
        />
        <Card.Body>
          <Card.Title>{groupName}</Card.Title>
          <Link to={`/groupdetails/${groupName}`}>
            <Button variant="info">Visit Group</Button>
          </Link>
          {'\u00A0'}
          {'\u00A0'}
          <Button variant="danger" id={groupName} onClick={onLeave}>Leave Group</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
