const { getActivityHandler } = require('./getActivityHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'get-activity') {
    delete msg.path;
    getActivityHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
