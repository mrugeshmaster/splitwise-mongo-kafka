import { USER_LOGIN } from '../../actions/constant-types';

const initState = {
  user: {},
};

const loginUserReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
