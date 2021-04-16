import { GET_BALANCES } from '../../actions/constant-types';

const initState = {
  balances: null,
};

const getBalancesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BALANCES:
      return {
        ...state,
        balances: action.payload,
      };
    default:
      return state;
  }
};

export default getBalancesReducer;
