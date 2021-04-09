/* eslint-disable max-len */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../landing/NavBar';
import GroupInvitation from './GroupInvitation';
import GroupMembership from './GroupMembership';
// import LeftSidebar from './LeftSidebar';
import SearchBar from '../SearchBar';
import { getGroupInvites, getGroupMemberships } from '../../actions/groups/getGroupsActions';

export default function Groups() {
  const [updated, setUpdated] = useState(false);
  const [groupSearchName, setGroupSearchName] = useState('');
  const groupInvites = useSelector((state) => state.getGroupInvitesReducer.groupInvites);
  const groupMemberships = useSelector((state) => state.getGroupMembershipsReducer.groupMemberships);
  const dispatch = useDispatch();
  console.log(groupMemberships);
  useEffect(() => {
    dispatch(getGroupInvites());
    dispatch(getGroupMemberships());
  }, [dispatch]);

  const onUpdateInvitation = () => {
    console.log('Inside Update Invitation');
    setUpdated(true);
  };

  const onSearchName = (groupName) => {
    setGroupSearchName(groupName);
  };

  useLayoutEffect(() => {
    dispatch(getGroupInvites());
    dispatch(getGroupMemberships());
    return (() => setUpdated(false));
  }, [dispatch, updated]);

  return (
    <div>
      <NavBar />
      {/* {errorMessage} */}
      <div className="mt-5">
        <Row>
          <Col md={{ offset: 1, span: 2 }} className="flex-column">
            {/* <LeftSidebar /> */}
            &nbsp;
          </Col>
          <Col>
            <Row>
              <Col md={6} className="pr-2">
                {groupMemberships.length > 0 && (
                <SearchBar
                  names={groupMemberships}
                  onSearchName={onSearchName}
                  onUpdateInvitation={onUpdateInvitation}
                />
                )}
              </Col>
              <Col md={1} className="p-0">
                <Link
                  variant="btn-info"
                  to={{
                    pathname: '/groupdetails',
                    state: { groupName: groupSearchName },
                  }}
                >
                  <ArrowRightSquareFill size="38px" />
                </Link>
              </Col>
            </Row>
            {groupInvites.length > 0 && (
            <Col md={{ span: 8 }} className="mt-4">
              <h3>Group Invitations</h3>
              <div className="my-5">
                <Container className="d-flex flex-wrap">
                  {groupInvites.map((groupInvite) => (
                    <GroupInvitation
                      key={groupInvite}
                      groupInvite={groupInvite}
                      onUpdateInvitation={onUpdateInvitation}
                    />
                  ))}
                </Container>
              </div>
            </Col>
            )}
            {groupMemberships.length > 0 && (
            <Col md={{ span: 8 }} className="mt-4">
              <h3>Group Membership</h3>
              <div className="my-5">
                <Container className="d-flex flex-wrap">
                  {groupMemberships.map((groupMembership) => (
                    <GroupMembership
                      key={groupMembership}
                      groupMembership={groupMembership}
                      onUpdateInvitation={onUpdateInvitation}
                    />
                  ))}
                </Container>
              </div>
            </Col>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

// class GroupsClass extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       groupInvites: [],
//       groupMemberships: [],
//       groupSearchName: '',
//     };
//   }

//   componentDidMount() {
//     this.getGroups();
//   }

//   onUpdateInvitation = () => {
//     this.setState({
//       groupInvites: [],
//       groupMemberships: [],
//     });
//     this.getGroups();
//   }

//   getGroups = async () => {
//     await axios.get(`${apiHost}/api/getGroups/${localStorage.getItem('user_id')}`)
//       .then((response) => {
//         response.data.map((res) => {
//           if (res.is_member === 'Y') {
//             const list = [...this.state.groupMemberships, res];
//             this.setState({
//               groupMemberships: list,
//             });
//           } else if (res.is_member === 'N') {
//             const list = [...this.state.groupInvites, res];
//             this.setState({ groupInvites: list });
//           }
//         });
//       }).catch((err) => {
//         this.setState({
//           message: err.response.data.message,
//         });
//       });
//   }

//   onSearchName = async (groupName) => {
//     this.setState({
//       groupSearchName: groupName,
//     });
//   }

//   render() {
//     console.log(`render groupsearch : ${JSON.stringify(this.state.groupSearch)}`);
//     let errorMessage = null;
//     if (this.state.message === 'NO_GROUPS') {
//       errorMessage = <Alert variant="danger">You are not a part of any group. Create a New Group ! </Alert>;
//     }

// export default Groups;