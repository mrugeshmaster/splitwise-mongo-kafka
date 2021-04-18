import { SETTLE_UP } from '../../actions/constant-types';
// import getBalancesAction from '../../actions/bills/getBalancesAction';

const initState = {
  message: null,
};

const settleUpReducer = (state = initState, action) => {
  switch (action.type) {
    case SETTLE_UP:
      // getBalancesAction();
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default settleUpReducer;
