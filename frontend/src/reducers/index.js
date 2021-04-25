import { combineReducers } from 'redux';
import loginUserReducer from './account/loginUserReducer';
import signUpUserReducer from './account/signUpUserReducer';
import userProfileReducer from './user/userProfileReducer';
import getAllUsersReducer from './group/getAllUsersReducer';
import createGroupReducer from './group/createGroupReducer';
import getGroupInvitesReducer from './group/getGroupInvitesReducer';
import getGroupMembershipsReducer from './group/getGroupMembershipsReducer';
import acceptInviteReducer from './group/acceptInviteReducer';
import rejectInviteReducer from './group/rejectInviteReducer';
import getGroupDetailsReducer from './group/getGroupDetailsReducer';
import addExpenseReducer from './bills/addExpenseReducer';
import getBalancesReducer from './bills/getBalancesReducer';
import settleUpReducer from './bills/settleUpReducer';
import addCommentReducer from './bills/addCommentReducer';
import deleteCommentReducer from './bills/deleteCommentReducer';
import getActivityReducer from './activity/getActivityReducer';

const rootReducer = combineReducers({
  login: loginUserReducer,
  signup: signUpUserReducer,
  userProfile: userProfileReducer,
  getAllUsersReducer,
  createGroupReducer,
  getGroupInvitesReducer,
  getGroupMembershipsReducer,
  acceptInviteReducer,
  rejectInviteReducer,
  getGroupDetailsReducer,
  addExpenseReducer,
  getBalancesReducer,
  settleUpReducer,
  addCommentReducer,
  deleteCommentReducer,
  getActivityReducer,
});

export default (state, action) => rootReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);
