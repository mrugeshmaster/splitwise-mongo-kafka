/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button, ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import NavBar from '../landing/NavBar';
import LeftSidebar from '../landing/LeftSideBar';
import ExpenseModal from '../bills/ExpenseModal';
import GroupDetailsCell from './GroupDetailsCell';
import GroupDetailsSideBar from './GroupBalancesSideBar';
import getGroupDetails from '../../actions/groups/groupDetailsActions';

export default function GroupDetails() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const groupDetails = useSelector((state) => state.getGroupDetailsReducer.groupDetails);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupDetails(params.groupName));
  }, [dispatch, params.groupName]);

  const groupElements = [];
  if (groupDetails.bills && groupDetails.bills.length > 0) {
    groupDetails.bills.map((bill) => {
      const groupElement = (
        <ListGroup.Item key={bill.description}>
          <GroupDetailsCell
            key={bill.description}
            bill={bill}
          />
        </ListGroup.Item>
      );
      groupElements.push(groupElement);
    });
  }

  return (
    <div>
      <NavBar />
      <div>
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>
            <LeftSidebar />
            &nbsp;
          </Col>
          <Col md={{ span: 6 }} className="mx-2">
            <Row>
              <h2>
                {params.groupName}
              </h2>
              <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ExpenseModal
                  show={showExpenseModal}
                  handleClose={() => setShowExpenseModal(false)}
                  groupName={params.groupName}
                />
                <Button variant="success" onClick={() => setShowExpenseModal(true)}>Add an Expense</Button>
              </Col>
            </Row>
            &nbsp;
            <Row>
              <ListGroup variant="flush" style={{ width: '100%' }}>
                {groupElements}
              </ListGroup>
            </Row>
          </Col>
          <Col md={{ span: 2 }}>
            <GroupDetailsSideBar
              key={params.groupName}
              bills={groupDetails.bills}
              // groupName={this.state.group_name}
              // updateChild={this.state.updateChild}
              // onUpdateChild={this.onUpdateChild}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
