const { createGroupHandler } = require('./createGroupHandler');
const { getGroupDetailsHandler } = require('./getGroupDetailsHandler');
const { getGroupInvitesHandler } = require('./getGroupInvitesHandler');
const { getGroupMembershipsHandler } = require('./getGroupMembershipsHandler');
const { getAllUsersHandler } = require('./getAllUsersHandler');
const { acceptInviteHandler } = require('./acceptInviteHandler');
const { rejectInviteHandler } = require('./rejectInviteHandler');
const { leaveGroupHandler } = require('./leaveGroupHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'create-new-group') {
    delete msg.path;
    createGroupHandler(msg, callback);
  } else if (msg.path === 'get-group-details') {
    delete msg.path;
    getGroupDetailsHandler(msg, callback);
  } else if (msg.path === 'get-groups-invites') {
    delete msg.path;
    getGroupInvitesHandler(msg, callback);
  } else if (msg.path === 'get-groups-memberships') {
    delete msg.path;
    getGroupMembershipsHandler(msg, callback);
  } else if (msg.path === 'group-accept-invite') {
    delete msg.path;
    acceptInviteHandler(msg, callback);
  } else if (msg.path === 'group-reject-invite') {
    delete msg.path;
    rejectInviteHandler(msg, callback);
  } else if (msg.path === 'get-all-users') {
    delete msg.path;
    getAllUsersHandler(msg, callback);
  } else if (msg.path === 'group-leave') {
    delete msg.path;
    leaveGroupHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
