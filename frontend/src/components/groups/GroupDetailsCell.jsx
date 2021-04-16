import React from 'react';
import {
  Row, Col, Accordion, Media, Container,
} from 'react-bootstrap';
import Moment from 'react-moment';
import '../../App.css';
import numeral from 'numeral';

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
                  props.bill.paidby.name === localStorage.getItem('')
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
          <Row>
            <Col>
              <Media>
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <Row className="pl-2">{props.bill.description}</Row>
                  <Row className="pl-2">
                    {numeral(Math.abs(props.bill.splitAmount)).format('$0,0.00')}
                  </Row>
                  <Row className="pl-2 billdate" style={{ fontSize: '0.8rem' }}>
                    Added by
                    {' '}
                    {props.bill.paidby.name}
                    {' '}
                    on
                    &nbsp;
                    <Moment
                      tz={localStorage.getItem('timezone')}
                      format="MMMM DD, YYYY"
                    >
                      {props.bill.date}
                    </Moment>
                  </Row>
                </Media.Body>
              </Media>
            </Col>
          </Row>
          <Row>
            <Col />
            <Col>
              <Row className="billdate">Notes and Comments</Row>
            </Col>
          </Row>
        </Container>
      </Accordion.Collapse>
    </Accordion>
  );
}
