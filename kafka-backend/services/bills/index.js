const { addExpenseHandler } = require('./addExpenseHandler');
const { settleUpHandler } = require('./settleUpHandler');
const { getBalancesHandler } = require('./getBalancesHandler');
const { addCommentHandler } = require('./addCommentHandler');
const { deleteCommentHandler } = require('./deleteCommentHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'add-expense') {
    delete msg.path;
    addExpenseHandler(msg, callback);
  } else if (msg.path === 'get-balances') {
    delete msg.path;
    getBalancesHandler(msg, callback);
  } else if (msg.path === 'settle-up') {
    delete msg.path;
    settleUpHandler(msg, callback);
  } else if (msg.path === 'add-comment') {
    delete msg.path;
    addCommentHandler(msg, callback);
  } else if (msg.path === 'delete-comment') {
    delete msg.path;
    deleteCommentHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
