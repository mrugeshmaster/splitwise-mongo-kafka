import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import {
  Row, Col, ListGroup, Button, Media,
} from 'react-bootstrap';
import { Divider } from '@material-ui/core';
import numeral from 'numeral';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../landing/NavBar';
import LeftSideBar from '../landing/LeftSideBar';
import SettleUpModal from '../bills/SettleUpModal';
import getBalancesAction from '../../actions/bills/getBalancesAction';

export default function Home() {
  const [showSettleUpModal, setShowSettleUpModal] = useState(false);
  const [settledUp, setSettledUp] = useState(false);
  const balances = useSelector((state) => state.getBalancesReducer.balances);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalancesAction());
  }, [dispatch, settledUp]);

  const handleClose = () => {
    setShowSettleUpModal(false);
    setSettledUp(true);
  };

  let redirectVar = null;
  if (!localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/" />;
  }

  const payNames = balances && balances.payBills.map((payBill) => payBill.name);
  const collectNames = balances && balances.collectBills.map((collectBill) => collectBill.name);
  // const names = {
  //   payNames,
  //   collectNames,
  // };
  const payItems = balances && balances.payBills.map((payBill) => (
    <Media as="li" className="py-3" key={payBill.name}>
      <img
        width={40}
        height={40}
        className="mr-3"
        src={payBill.image}
        alt="Generic placeholder"
      />
      <Media.Body>
        <Row className="pl-2">{payBill.name}</Row>
        <Row
          className="owe pl-2"
        >
          You owe
            &nbsp;
          {numeral(Math.abs(payBill.amount)).format('$0,0.00')}
        </Row>
      </Media.Body>
    </Media>
  ));

  const collectItems = balances && balances.collectBills.map((collectBill) => (
    <Media as="li" className="py-3" key={collectBill.name}>
      <img
        width={40}
        height={40}
        className="mr-3"
        src={collectBill.image}
        alt="Generic placeholder"
      />
      <Media.Body>
        <Row className="pl-2">{collectBill.name}</Row>
        <Row
          className="paid pl-2"
        >
          owes you
            &nbsp;
          {numeral(Math.abs(collectBill.amount)).format('$0,0.00')}
        </Row>
      </Media.Body>
    </Media>
  ));
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
            <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SettleUpModal
                show={showSettleUpModal}
                onClose={handleClose}
                getBalancesAction={getBalancesAction}
                payNames={payNames}
                collectNames={collectNames}
                payBills={balances ? balances.payBills : []}
                collectBills={balances ? balances.collectBills : []}
              />
              <Button variant="success" onClick={() => { setShowSettleUpModal(true); setSettledUp(false); }}>Settle Up</Button>
            </Col>
          </Row>
          {balances && (
            <div>
              <Row className="mt-2">
                <ListGroup horizontal style={{ width: '100%' }}>
                  <ListGroup.Item as={Col}>
                    <Row className="balanceItem">
                      Total Balance
                    </Row>
                    <Row className="balanceItem">{numeral(balances.totalBalance).format('$0,0.00')}</Row>
                  </ListGroup.Item>
                  <ListGroup.Item as={Col}>
                    <Row className="balanceItem">you owe</Row>
                    <Row className="balanceItem">{numeral(balances.payBalance).format('$0,0.00')}</Row>
                  </ListGroup.Item>
                  <ListGroup.Item as={Col}>
                    <Row className="balanceItem">you are owed</Row>
                    <Row className="balanceItem">{numeral(balances.collectBalance).format('$0,0.00')}</Row>
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              <Row className="mt-3">
                <Col>
                  <h4 className="text-muted">You Owe</h4>
                  <ListGroup variant="flush">
                    {payItems.length > 0 ? payItems : <div className="mt-2 text-muted d-flex">You are settled</div> }
                  </ListGroup>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col>
                  <Row className="mr-1" style={{ display: 'flex', justifyContent: 'flex-end' }}><h4 className="text-muted">You are Owed</h4></Row>
                  <ListGroup variant="flush">
                    {collectItems.length > 0 ? collectItems : <div className="mt-2 pr-0 text-muted d-flex justify-content-end">You are settled</div> }
                  </ListGroup>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
