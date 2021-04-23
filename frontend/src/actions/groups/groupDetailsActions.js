import axios from 'axios';
import { GET_GROUP_DETAILS, LEAVE_GROUP } from '../constant-types';
import apiHost from '../../apiHost';

const getGroupDetails = (groupName) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.get(`${apiHost}/api/groups/${groupName}`)
    .then((response) => response.data.groupDetails)
    .then((groupDetails) => dispatch({
      type: GET_GROUP_DETAILS,
      payload: groupDetails,
    }))
    .catch((error) => dispatch({
      type: GET_GROUP_DETAILS,
      payload: error.response.data,
    }));
};

const groupLeave = (groupName) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  const data = {
    groupName,
  };
  axios.post(`${apiHost}/api/groups/leave`, data)
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: LEAVE_GROUP,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: LEAVE_GROUP,
      payload: error.response.data,
    }));
};

export { getGroupDetails, groupLeave };
