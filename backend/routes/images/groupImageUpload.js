const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../utils/config');
const s3 = require('./s3');

const groupImageUpload = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(
        null,
        `groupImages/${req.params.groupName}_${Date.now()}${file.originalname}`,
      );
    },
  }),
}).single('groupImage');

module.exports = groupImageUpload;
