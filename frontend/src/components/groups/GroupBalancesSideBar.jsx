import React from 'react';
import { Row, Media, Container } from 'react-bootstrap';
import numeral from 'numeral';

export default function GroupDetailsSideBar(props) {
  console.log(props);
  return (
    <Container className="mt-4">
      <div className="text-muted">Group Members</div>
      <ul className="list-unstyled py-3">
        {props.sideBarData && props.sideBarData.map((user) => (
          <Media as="li" className="py-3" key={user.name}>
            <img
              width={40}
              height={40}
              className="mr-3"
              src={user.image}
              alt="Generic placeholder"
            />
            <Media.Body>
              <Row className="pl-2">{user.name}</Row>
              <Row
                className={user.amount > 0 ? 'paid pl-2' : 'owe pl-2'}
              >
                {user.amount > 0 ? 'gets back' : 'owes'}
                &nbsp;
                {numeral(Math.abs(user.amount)).format('$0,0.00')}
              </Row>
            </Media.Body>
          </Media>
        ))}
      </ul>
    </Container>
  );
}
