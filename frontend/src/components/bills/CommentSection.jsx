/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Button, Modal, Row, Col, Card,
} from 'react-bootstrap';
import Moment from 'react-moment';
import { X } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import deleteCommentAction from '../../actions/bills/deleteCommentAction';

export default function CommentSection(props) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteComment = (e) => {
    console.log(props.comment);
    console.log(e);
    const data = {
      description: props.bill.description,
      groupName: props.bill.groupName,
      id: props.comment._id,
    };
    console.log(data);
    dispatch(deleteCommentAction(data));
    dispatch(props.getGroupDetails(props.bill.groupName));
    handleClose();
    // setActivity(true);
  };

  return (
    <Row
      className="my-2"
      style={{ fontSize: '0.8rem' }}
    >
      <Card style={{ minWidth: '100%' }}>
        <Card.Body className="py-1">
          <Row>
            <b>{props.comment.user.name}</b>
            &nbsp;
            <Moment
              className="billdate"
              tz={localStorage.getItem('timezone')}
              format="MMM DD"
            >
              {props.comment.commentCreatedAt}
            </Moment>
            <Col style={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
              {props.comment.user.name === localStorage.getItem('name') && (
              <X
                className="fa-x-icon"
                as={Button}
                onClick={handleShow}
              />
              )}
            </Col>
          </Row>
          <Row>{props.comment.comment}</Row>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the note ?</Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outline-danger" value={props.comment._id} onClick={deleteComment}>
                Delete Note
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Row>
  );
}
