import React from 'react';
import {
  Row, Col, Media,
} from 'react-bootstrap';
import numeral from 'numeral';
import Moment from 'react-moment';

export default function BillDetails(props) {
  return (
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
  );
}
