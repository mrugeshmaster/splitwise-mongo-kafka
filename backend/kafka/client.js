/* eslint-disable global-require */
const rpc = new (require('./kafkarpc'))();

// make request to kafka
function makeRequest(queueName, msgPayload, callback) {
  console.log('in make request');
  console.log(msgPayload);
  rpc.makeRequest(queueName, msgPayload, (err, response) => {
    if (err) console.error(err);
    else {
      console.log('makeRequest response', response);
      callback(null, response);
    }
  });
}

exports.makeRequest = makeRequest;
