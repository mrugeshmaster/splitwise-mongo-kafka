import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import numeral from 'numeral';
import '../../App.css';

export default function RecentActivityCell(props) {
  console.log(props.activity);
  return (
    <Row>
      <Col>
        <Row>
          <b>{props.activity.paidby.name === localStorage.getItem('name') ? 'You' : `${props.activity.paidby.name}` }</b>
          &nbsp;added&nbsp;
          <b>
            {props.activity.billDescription}
          </b>
          &nbsp;in&nbsp;
          <b>
            {props.activity.groupName}
          </b>
          .
        </Row>
        <Row
          className={props.activity.users[0].collectOrPay === 'PAY' ? 'owe' : 'paid'}
        >
          {props.activity.users[0].collectOrPay === 'PAY' ? 'You owe' : 'You get back' }
          &nbsp;
          {numeral(Math.abs(props.activity.users[0].amount)).format('$0,0.00')}
        </Row>
        <Row>
          <Moment
            date={Date.UTC(props.activity.timePosted)}
            tz={localStorage.getItem('timezone')}
            style={{ fontSize: '0.8rem' }}
            className="billdate"
            format="dddd"
          />
        </Row>
      </Col>
    </Row>
  );
}
