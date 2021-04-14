/* eslint-disable max-len */
import React from 'react';
import { Redirect } from 'react-router';
import {
  Row, Col, ListGroup,
} from 'react-bootstrap';
import { Divider } from '@material-ui/core';
import '../../App.css';
import NavBar from '../landing/NavBar';
import LeftSideBar from '../landing/LeftSideBar';

export default function Home() {
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
        <Col md={{ span: 6 }} className="mx-2">
          <Row>
            <h2>
              Dashboard
            </h2>
            {/* <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SettleUpModal
                show={this.state.showSettleUpModal}
                onClose={this.onHideSettleUpModal}
                payNames={payNames}
              />
              <Button variant="success" onClick={this.onShowSettleUpModal}>Settle Up</Button>
            </Col> */}
          </Row>
          <Row className="mt-2">
            <ListGroup horizontal style={{ width: '100%' }}>
              <ListGroup.Item as={Col}>
                <Row className="balanceItem">
                  Total Balance
                </Row>
                {/* <Row className="balanceItem">{numeral(collectBalance - payBalance).format('$0,0.00')}</Row> */}
              </ListGroup.Item>
              <ListGroup.Item as={Col}>
                <Row className="balanceItem">you owe</Row>
                {/* <Row className="balanceItem">{numeral(payBalance).format('$0,0.00')}</Row> */}
              </ListGroup.Item>
              <ListGroup.Item as={Col}>
                <Row className="balanceItem">you are owed</Row>
                {/* <Row className="balanceItem">{numeral(collectBalance).format('$0,0.00')}</Row> */}
              </ListGroup.Item>
            </ListGroup>
          </Row>
          <Row className="mt-3">
            <Col>
              <h4 className="text-muted">You Owe</h4>
              {/* <ListGroup variant="flush">
                {payItems.length > 0 ? payItems : <div className="mt-2 text-muted d-flex">You are settled</div> }
              </ListGroup> */}
            </Col>
            <Divider orientation="vertical" flexItem />
            <Col>
              <Row className="mr-1" style={{ display: 'flex', justifyContent: 'flex-end' }}><h4 className="text-muted">You are Owed</h4></Row>
              {/* <ListGroup variant="flush">
                {collectItems.length > 0 ? collectItems : <div className="mt-2 pr-0 text-muted d-flex justify-content-end">You are settled</div> }
              </ListGroup> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
