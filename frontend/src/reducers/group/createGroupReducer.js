import { CREATE_GROUP, RESET_MESSAGE, UPLOAD_GROUP_IMAGE } from '../../actions/constant-types';

const initState = {
  message: null,
  groupImageDetails: {},
};

const createGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        message: action.payload,
      };
    case UPLOAD_GROUP_IMAGE:
      return {
        ...state,
        groupImageDetails: action.payload,
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

export default createGroupReducer;
