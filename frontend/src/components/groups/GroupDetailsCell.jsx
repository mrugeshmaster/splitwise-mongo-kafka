/* eslint-disable max-len */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import '../../App.css';
import numeral from 'numeral';

export default function GroupDetailsCell(props) {
  return (
    <Row>
      <Col md={2}>
        <Moment
          tz={localStorage.getItem('timezone')}
          className="billdate"
          format="MMM DD"
        >
          {props.bill.date}
        </Moment>
      </Col>
      <Col md={6}>{props.bill.description}</Col>
      <Col md={2}>
        <Row>
          <Col>
            <Row style={{ fontSize: '12px', color: 'grey' }}>
              { props.bill.paidby.name === localStorage.getItem('name') ? (
                'you paid'
              ) : (
                `${props.bill.paid.by.name} paid`
              ) }
            </Row>
            <Row>{numeral(props.bill.billAmount).format('$0,0.00')}</Row>
          </Col>
        </Row>
      </Col>
      <Col md={2}>
        <Row>
          <Col>
            <Row style={{ fontSize: '12px', color: 'grey' }}>
              { props.bill.paidby.name === localStorage.getItem('name') ? (
                'you lent'
              ) : (
                `${props.bill.paidby.name} lent you`
              ) }
            </Row>
            <Row
              className={
                props.bill.paidby.name === localStorage.getItem('')
                  ? 'paid' : 'owe'
                }
            >
              {numeral(props.bill.splitAmount).format('$0,0.00')}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
