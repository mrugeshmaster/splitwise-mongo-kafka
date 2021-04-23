/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Row, Col, Media } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import numeral from 'numeral';
import '../../App.css';

export default function RecentActivityCell(props) {
  return (
    <Row>
      <Col>
        <Media as="li" className="py-3" key={props.activity._id}>
          <img
            width={40}
            height={40}
            className="mr-3"
            src={props.activity.paidby.image}
            alt="Generic placeholder"
          />
          <Media.Body className="pl-2">
            <Row>
              <b>{props.activity.paidby.name === localStorage.getItem('name') ? 'You' : `${props.activity.paidby.name}` }</b>
                &nbsp;
              {props.activity.activity === 'CREATE' ? 'added' : 'updated comments for'}
                &nbsp;
              <b>
                {props.activity.billDescription}
              </b>
                &nbsp;in&nbsp;
              <b>
                {props.activity.groupName}
              </b>
              .
            </Row>
            {props.activity.activity === 'CREATE' && (
            <Row
              className={props.activity.users[0].collectOrPay === 'PAY' ? 'owe' : 'paid'}
            >
              {props.activity.users[0].collectOrPay === 'PAY' ? 'You owe' : 'You get back' }
                  &nbsp;
              {numeral(Math.abs(props.activity.users[0].amount)).format('$0,0.00')}
            </Row>
            )}
            <Row>
              <Moment
                date={Date.UTC(props.activity.timePosted)}
                tz={localStorage.getItem('timezone')}
                style={{ fontSize: '0.8rem' }}
                className="billdate"
                format="dddd"
              />
            </Row>
          </Media.Body>
        </Media>
      </Col>
    </Row>
  );
}
