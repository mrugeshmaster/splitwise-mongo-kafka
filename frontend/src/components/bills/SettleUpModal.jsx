import React, {
  useState,
} from 'react';

import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import SearchBar from '../SearchBar';
import settleUpAction from '../../actions/bills/settleUpAction';

export default function SettleUpModal(props) {
  const [inputs, setInputs] = useState({
    settleUpWith: '',
    settleAmount: 0,
    settleType: '',
  });
  const dispatch = useDispatch();
  const onSearchName = (name) => {
    const { amount } = props.payBills.find((payBill) => payBill.name === name)
    || props.collectBills.find((collectBill) => collectBill.name === name);
    const type = props.payBills.find((payBill) => payBill.name === name) ? 'PAY' : 'COLLECT';
    setInputs(() => ({ settleUpWith: name, settleAmount: amount, settleType: type }));
  };

  const onSave = () => {
    const data = {
      settleUpWith: inputs.settleUpWith,
      settleAmount: inputs.settleAmount,
      settleType: inputs.settleType,
    };
    dispatch(settleUpAction(data));
    dispatch(props.getBalancesAction());
    setInputs(() => ({ settleUpWith: '', settleAmount: 0 }));
    props.onClose();
  };

  const onClose = () => {
    setInputs(() => ({ settleUpWith: '', settleAmount: 0 }));
    props.onClose();
  };

  const names = props.payNames && props.collectNames
    ? [...props.payNames, ...props.collectNames]
    : [];

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Row>
            <Col>Settle Up</Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={{ span: 3 }}>
            You Paid:
          </Col>
          <Col>
            <SearchBar as="input" names={names} onSearchName={onSearchName} />
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col>
            <Form.Control
              name="settleAmount"
              type="text"
              value={numeral(Math.abs(inputs.settleAmount)).format('$0,0.00')}
              disabled
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
