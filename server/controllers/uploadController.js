const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const Profile = require("../models/ProfileModel");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_BUCKET_REGION,
});

exports.setUpload = (req, res, next) => {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "breadsticks",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, (img = Date.now() + file.originalname));
      },
    }),
  });
  const multipleUpload = upload.array("photos", 3);

  multipleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        $addToSet: { photos: img },
      }
    );
    res.status(200).json({ data: "files uploaded and db is updated" });
  });
};
