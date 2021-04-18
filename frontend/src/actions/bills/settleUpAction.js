import axios from 'axios';
import { SETTLE_UP } from '../constant-types';
import apiHost from '../../apiHost';

const settleUpAction = (settleUpInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.post(`${apiHost}/api/bills/settleup`, settleUpInfo)
    .then((response) => response.data.message)
    .then((message) => {
      console.log('Here 2');
      dispatch({
        type: SETTLE_UP,
        payload: message,
      });
    })
    .catch((error) => dispatch({
      type: SETTLE_UP,
      payload: error.response.data.message,
    }));
};

export default settleUpAction;
