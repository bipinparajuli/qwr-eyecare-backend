const multer = require("multer");
const path = require("path");
const constants = require("./constants");
/** code to configure user upload profile image starts */
const userUploadDirPath = path.join(__dirname, "..", constants.UPLOAD_DIR_PATH.USER_IMAGE);

let userImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userUploadDirPath);
  },
  filename: function (req, file, cb) {
    let exploded_name = file.originalname.split(".");
    let ext = exploded_name[exploded_name.length - 1];
    cb(null, Date.now() + "." + ext);
  }
});

let uploadUserImageConfig = multer({
  storage: userImageStorage,
  limits: {
    fileSize: 15000000 // 5MB
  },
  fileFilter: function (req, file, cb) {
    return cb(null, true);
  }
}).fields([
  { name: "profile_image", maxCount: 1 }
]);





module.exports = {
  uploadUserImageConfig: uploadUserImageConfig
};