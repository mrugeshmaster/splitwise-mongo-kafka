const AWS = require('aws-sdk');
const config = require('../../utils/config');

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

module.exports = s3;
