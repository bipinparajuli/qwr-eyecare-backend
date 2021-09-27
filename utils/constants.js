"user strict";

// constants to define PAGINATION
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 50;

// this is the name of place holder image this image will be in root of public folder
const PLACEHOLDER_IMAGE = "placeholder-150x150.png";

const UPLOAD_DIR_PATH = {
  USER_IMAGE:'public/user-images',
}

//const SSH_PASSWORD_KEY = "198a38074880a9c67ace9c865eeeb0c8";
const BASE_IMAGE_UPLOAD_PATH = "public/images";
//const BASE_IMAGE_UPLOAD_PATH = "../images-outside";
const COMMON_MESSAGES = {
  "USER_FOUND":"User data found",
  "USER_DETAILS_UPDATED":"User details updated",
  "USER_DELETED":"User Successfully Deleted",
  "USER_VERIFIED":"User verification successfull",
  "USER_PASSWORD_UPDATED":"Your password has been updated successfully",
  "CONFIRM_PASSWORD_NOT_VALID":"please enter valid confirm password",
  "DATA_NOT_FOUND":"No data available",
  "DATA_FOUND":"data available",
  "DATA_UPDATED":"Data Updated Successfull",
  "DATA_DELETED":"Data Deleted Successfully",
  "EMAIL_EXIST":"Email Already Exist",
  "USERNAME_EXIST":"Username Already Exist",
  "NUMBER_EXIST":"Mobile Number Already Exist",
  "EMAIL_NOT_VERIFIED":"Please verify your email"
};

const COMMON_ERROR_MESSAGES = {
  "DEFAULT_ERROR":"Something went Wrong , Please try again"
};

module.exports = {
  // PHONE_REGEX: PHONE_REGEX,
  // LENGTHS: LENGTHS,
  PLACEHOLDER_IMAGE: PLACEHOLDER_IMAGE,
  DEFAULT_OFFSET:DEFAULT_OFFSET,
  DEFAULT_LIMIT:DEFAULT_LIMIT,
  UPLOAD_DIR_PATH:UPLOAD_DIR_PATH,
  // SSH_PASSWORD_KEY:SSH_PASSWORD_KEY,
  BASE_IMAGE_UPLOAD_PATH:BASE_IMAGE_UPLOAD_PATH,
  COMMON_MESSAGES:COMMON_MESSAGES,
  COMMON_ERROR_MESSAGES:COMMON_ERROR_MESSAGES,
};
