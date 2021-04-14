const jwtDecode = require('jwt-decode');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../utils/config');
const s3 = require('./s3');

const userImageUpload = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(
        null,
        `userImages/${jwtDecode(req.headers.authorization).id}_${Date.now()}${file.originalname}`,
      );
    },
  }),
}).single('image');

module.exports = userImageUpload;
