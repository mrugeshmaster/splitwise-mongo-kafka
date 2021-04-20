import axios from 'axios';
import { DELETE_COMMENT } from '../constant-types';
import apiHost from '../../apiHost';

const deleteCommentAction = (commentInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.delete(`${apiHost}/api/bills/comments`, { data: commentInfo })
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: DELETE_COMMENT,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: DELETE_COMMENT,
      payload: error.response.data,
    }));
};

export default deleteCommentAction;
