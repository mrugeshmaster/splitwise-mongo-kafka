import axios from 'axios';
import { ADD_COMMENT } from '../constant-types';
import apiHost from '../../apiHost';

const addCommentAction = (commentInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.post(`${apiHost}/api/bills/comments`, commentInfo)
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: ADD_COMMENT,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: ADD_COMMENT,
      payload: error.response.data,
    }));
};

export default addCommentAction;
