/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ChatFill } from 'react-bootstrap-icons';
import addCommentAction from '../../actions/bills/addCommentAction';
import CommentSection from './CommentSection';

export default function BillComments(props) {
  const [comment, setComment] = useState('');
  const [activity, setActivity] = useState(true);

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  useEffect(() => {
    setActivity(false);
    setComment('');
  }, [activity]);

  const updateActivity = () => {
    setActivity(true);
  };

  const postComment = () => {
    const data = {
      description: props.bill.description,
      groupName: props.bill.groupName,
      comment,
    };
    dispatch(addCommentAction(data));
    dispatch(props.getGroupDetails(props.bill.groupName));
    setActivity(true);
  };

  return (
    <Row>
      <Col md={{ offset: 6 }}>
        <Row className="billdate my-1">
          <ChatFill />
          &nbsp;
          Notes and Comments
        </Row>
        {props.bill.comments && props.bill.comments.map((c) => (
          <CommentSection
            key={c._id}
            bill={props.bill}
            comment={c}
            getGroupDetails={props.getGroupDetails}
            updateActivity={updateActivity}
          />
        ))}
        <Form.Group as={Row}>
          <Form.Control
            as="textarea"
            style={{ fontSize: '0.8rem' }}
            rows={3}
            name="comment"
            placeholder="Add a comment"
            value={comment}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Button
            as="input"
            type="button"
            variant="outline-info"
            size="sm"
            value="Post"
            onClick={postComment}
          />
        </Form.Group>
      </Col>
    </Row>
  );
}
