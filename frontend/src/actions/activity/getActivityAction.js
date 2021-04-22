import axios from 'axios';
import { GET_ACTIVITY } from '../constant-types';
import apiHost from '../../apiHost';

const getActivityAction = (query) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  const filter = query.groupName !== 'ALL' ? `&groupName=${query.groupName}` : '';
  axios.get(`${apiHost}/api/activity?order=${query.order}&page=${query.activePage}&pageSize=${query.pageSize}${filter}`)
    .then((response) => response.data.activities)
    .then((activities) => dispatch({
      type: GET_ACTIVITY,
      payload: activities,
    }))
    .catch((error) => dispatch({
      type: GET_ACTIVITY,
      payload: error.response.data.message,
    }));
};

export default getActivityAction;
