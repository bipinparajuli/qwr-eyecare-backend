"use strict";

const ERROR_CODES = {
  AUTH_TOKEN_PRIVATE_KEY_NOT_FOUND: {
    CODE: 50001,
    MESSAGE: "Private key not found for auth token signing"
  },
  AUTH_TOKEN_PUBLIC_KEY_NOT_FOUND: {
    CODE: 50002,
    MESSAGE: "Public key not found for auth token verifying"
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: "Not found"
  },
  UNKNOWN_ERROR: {
    CODE: 999999,
    MESSAGE: "Something went wrong"
  },
  USER_NOT_FOUND: {
    CODE: 999991,
    MESSAGE: "User not found"
  },
  
  INVALID_CONFIRM_PASSWORD: {
    CODE: 40007,
    MESSAGE: "Confirm password does not match",
  },

  AUTH_TOKEN: {
    REQUIRED: {
      CODE: 41001,
      MESSAGE: "Auth token is required"
    },
    NOT_VALID: {
      CODE: 41002,
      MESSAGE: "Auth token is not valid"
    }
  },

  DATABASE_ERROR: {
    INVALID_EMAIL_OR_USERNAME:{
      CODE: 40003,
      MESSAGE: "Please enter your valid email address"
    },
    INVALID_EMAIL_OR_MOBILE_NUMBER:{
      CODE: 40003,
      MESSAGE: "Email address or mobile number does not exist"
    },
    INVALID_PASSWORD: {
      CODE: 40002,
      MESSAGE: "Password does not match"
    },
  }
};




module.exports = {
  ERROR_CODES: ERROR_CODES
};
