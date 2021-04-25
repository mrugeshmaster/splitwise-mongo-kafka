import React from 'react';
import {
  Row, Col, Accordion, Container,
} from 'react-bootstrap';
import Moment from 'react-moment';
import numeral from 'numeral';
import { Divider } from '@material-ui/core';
import '../../App.css';
import BillDetails from '../bills/BillDetails';
import BillComments from '../bills/BillComments';

export default function GroupDetailsCell(props) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Toggle as={Row} eventKey="1">
        <Col md={2}>
          <Moment
            tz={localStorage.getItem('timezone')}
            className="billdate"
            format="MMM DD"
          >
            {props.bill.date}
          </Moment>
        </Col>
        <Col md={6} style={{ fontSize: '1.2rem' }}>{props.bill.description}</Col>
        <Col md={2}>
          <Row>
            <Col>
              <Row style={{ fontSize: '12px', color: 'grey' }}>
                { props.bill.paidby.name === localStorage.getItem('name') ? (
                  'you paid'
                ) : (
                  `${props.bill.paidby.name} paid`
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
                  props.bill.paidby.name === localStorage.getItem('name')
                    ? 'paid' : 'owe'
                  }
              >
                {numeral(props.bill.splitAmount).format('$0,0.00')}
              </Row>
            </Col>
          </Row>
        </Col>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <Container>
          <BillDetails
            bill={props.bill}
          />
          <Divider className="my-3" />
          <BillComments
            bill={props.bill}
            getGroupDetails={props.getGroupDetails}
          />
        </Container>
      </Accordion.Collapse>
    </Accordion>
  );
}
