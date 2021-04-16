import axios from 'axios';
import { GET_BALANCES } from '../constant-types';
import apiHost from '../../apiHost';

const getBalancesAction = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.get(`${apiHost}/api/bills/balances`)
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: GET_BALANCES,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: GET_BALANCES,
      payload: error.response.data.message,
    }));
};

export default getBalancesAction;
