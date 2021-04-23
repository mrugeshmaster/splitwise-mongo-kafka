import { GET_GROUP_DETAILS, LEAVE_GROUP, RESET_MESSAGE } from '../../actions/constant-types';

const initState = {
  groupDetails: {},
  message: '',
};

const getGroupDetailsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_GROUP_DETAILS:
      return {
        ...state,
        groupDetails: action.payload,
      };
    case LEAVE_GROUP:
      return {
        ...state,
        message: action.payload,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default getGroupDetailsReducer;
