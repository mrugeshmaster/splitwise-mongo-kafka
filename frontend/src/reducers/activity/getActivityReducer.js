import { GET_ACTIVITY } from '../../actions/constant-types';

const initState = {
  activities: null,
};

const getActivityReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};

export default getActivityReducer;
