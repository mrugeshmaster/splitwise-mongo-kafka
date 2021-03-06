import React, { useState } from 'react';
import {
  Navbar, Nav, Dropdown, Image, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import splitwiseLogo from '../../images/splitwise.svg';
import userIcon from '../../images/sp-ellie.svg';
import { userLogout } from '../../actions/account/loginUserAction';

export default function NavBar() {
  const [name, setName] = useState(localStorage.getItem('name'));
  const dispatch = useDispatch();

  const handleLogout = () => {
    setName('');
    localStorage.removeItem('idToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    dispatch(userLogout());
  };

  let navUser = null;
  let nameDropDown = null;
  nameDropDown = (
    <Dropdown>
      <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
        <Image src={userIcon} style={{ width: 20, height: 'auto' }} />
          &nbsp;Hi,
          &nbsp;
        {name}
        !
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Link to="/profile" className="nav-link">Your Account</Link>
        <Link to="/newgroup" className="nav-link">Create a Group</Link>
        <Link to="/" className="nav-link" onClick={handleLogout}>Log out</Link>
      </Dropdown.Menu>
    </Dropdown>
  );

  if (localStorage.getItem('idToken')) {
    navUser = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto" />
        <Nav.Item><Link className="nav-link" to="/home">Home</Link></Nav.Item>
        <Nav.Item>{nameDropDown}</Nav.Item>
      </div>
    );
  } else {
    navUser = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto" />
        <Nav.Item>
          {/* <Nav.Link href="/signup">&nbsp;Sign Up</Nav.Link> */}
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link href="/login">&nbsp;Login</Nav.Link> */}
          <Link className="nav-link" to="/login">Login</Link>
        </Nav.Item>
      </div>
    );
  }
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Col xs lg="1">
          {'\u00A0'}
        </Col>
        <Navbar.Brand>
          <Nav.Link href="/">
            <img src={splitwiseLogo} width="100" height="auto" className="d-inline-block align-top" alt="Splitwise" />
          </Nav.Link>
        </Navbar.Brand>
        {navUser}
        <Col xs lg="1">
          {'\u00A0'}
        </Col>
      </Navbar>
    </div>
  );
}
