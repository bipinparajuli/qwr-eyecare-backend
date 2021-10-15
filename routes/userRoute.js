"use strict";

const router = require("express-promise-router")();
const Bluebird = require("bluebird");
const UserController = require("../controllers/userController");
const utils = require("../utils/utils");
const constants = require("../utils/constants");
const customErrors = require("../utils/errors");
const otpGenerator = require('otp-generator');
const commonFunctionController = require("../controllers/commonFunctions");
// const multerSettings = require("../utils/multer-settings");
const authetication = require("../middleware/authentication");


  router.post("/register", function (req, res, next) {
    return Bluebird.try(async() => {
      let response = {success:false}; 
      let postData = req.body;
      postData.email = postData.email.toLowerCase();
      let checkEmailExists = await UserController.CheckFieldValueExist({email:postData.email});
      if(checkEmailExists){
        response.success = false;
        response.msg = constants.COMMON_MESSAGES.EMAIL_EXIST;
      }else{
        postData.mobile_number = parseInt(postData.mobile_number);
        let checkNumberExist = await UserController.CheckFieldValueExist({mobile_number:postData.mobile_number});
        if(checkNumberExist){
          response.success = false;
          response.msg = constants.COMMON_MESSAGES.NUMBER_EXIST;
        }else{
          postData.otp = await otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
          let isUserAdded = await UserController.createNewUser(postData);
          if(isUserAdded){
            let sendVerificationCode = await commonFunctionController.sendVerificationCode(postData);
            let result={
              id:isUserAdded._id,
              email:isUserAdded.email,
              subject:'Account Verification || QWR',
              message:`"Hello ${postData.name} , Here is the OTP to verify your Account : ${postData.otp}"`
            }
            commonFunctionController.sendMail(result);

            response.success = true;
            response.msg = "Verification code send successfull";
            response.data = isUserAdded;
          }else{
            response.success = false;
            response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
          }
        }            
      }
      return res.status(200).send(response);
    });
  });

  router.post("/verify-otp", function (req, res, next) {
    return Bluebird.try(async() => {
      let response = {success:false}; 
      let postData = req.body;
      let userFound = await UserController.findUserById(postData._id);
      if(userFound){
        if(postData.otp && postData.otp != '' && userFound.otp == postData.otp){
          let updateData = {
            status:"verified"
          }
          let UpdateUserDetails = await UserController.updatedUserData(userFound._id,updateData);
          if(UpdateUserDetails){

            if(!UpdateUserDetails.isOnboarded){
              UpdateUserDetails.isOnboarded = "false";
            }

            let signValues = { _id: UpdateUserDetails._id };
            UpdateUserDetails.token = await utils.signToken(signValues);
            response.success = true;
            response.msg = "Verified successfully";
            response.data = UpdateUserDetails; 
          }else{
            response.success = false;
            response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
          }
        }else{
          response.success = false;
          response.msg = "Invalid OTP code, Please try again";
        }
      }else{
        response.success = false;
        response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
      }
      return res.status(200).send(response);
    });
  });

  router.post("/login", function (req, res, next) {
    return Bluebird.try(async() => {
      let postData = req.body;
      let response = {success:false};
      let userFound = await UserController.findUserByEmailOrNumber(postData.email);
      if(userFound){
        if(postData.country_code && postData.country_code != '' && postData.country_code != userFound.country_code){
          response.success = false;
          response.msg = 'Please enter valid country code';
          return res.status(200).send(response); 
        }
        let otp = await otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        let updateData = {
          otp:otp
        }
        let UpdateUserDetails = await UserController.updatedUserData(userFound._id,updateData);
        if(UpdateUserDetails){
          //send verification code on text message
          let sendVerificationCode = await commonFunctionController.sendVerificationCode(UpdateUserDetails);
          
          //send verification code on email
          let result={
            id:UpdateUserDetails._id,
            email:UpdateUserDetails.email,
            subject:'Account Verification || QWR',
            message:`"Hello ${UpdateUserDetails.name} , Here is the OTP to verify your Account : ${UpdateUserDetails.otp}"`
          }
          commonFunctionController.sendMail(result);
          response.success = true;
          response.msg = "Verification code send successfull";
          response.data = UpdateUserDetails;
        }else{
          response.success = false;
          response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
        }
      }else{
        response.success = false;
        response.msg = customErrors.ERROR_CODES.DATABASE_ERROR.INVALID_EMAIL_OR_MOBILE_NUMBER.MESSAGE;
      }
      return res.status(200).send(response); 
    });
  });


  router.post("/resend-otp", function (req, res, next) {
    return Bluebird.try(async() => {
      let postData = req.body;
      let response = {success:false};

      let userFound = await UserController.findUserById(postData._id);
      if(userFound){
        let otp = await otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        let updateData = {
          otp:otp
        }
        let UpdateUserDetails = await UserController.updatedUserData(userFound._id,updateData);
        if(UpdateUserDetails){
          //send verification code on text message
          let sendVerificationCode = await commonFunctionController.sendVerificationCode(UpdateUserDetails);
          
          //send verification code on email
          let result={
            id:UpdateUserDetails._id,
            email:UpdateUserDetails.email,
            subject:'Account Verification || QWR',
            message:`"Hello ${UpdateUserDetails.name} , Here is the OTP to verify your Account : ${UpdateUserDetails.otp}"`
          }
          commonFunctionController.sendMail(result);
          response.success = true;
          response.msg = "Verification code send successfull";
          response.data = UpdateUserDetails;
        }else{
          response.success = false;
          response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
        }
      }else{
        response.success = false;
        response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
      }
      return res.status(200).send(response); 
    });
  });


  router.get("/user-details",[authetication.authenticate], function (req, res, next) {
    return Bluebird.try(async() => {
      let response = {success:false};
      if(req.user){

        if(!req.user.isOnboarded){
          req.user.isOnboarded = "false";
        }

        response.success = true;
        response.msg = constants.COMMON_MESSAGES.DATA_FOUND;
        response.data = req.user;
      }else{
        response.success = false;
        response.msg = customErrors.ERROR_CODES.USER_NOT_FOUND.MESSAGE;
      }
      return res.status(200).send(response);  
    });
  });


  router.post("/update-user-details",[authetication.authenticate], function (req, res, next) {
    return Bluebird.try(async() => {
      let response = {success:false};
      let postData = req.body;
      let UpdateUserDetails = await UserController.updatedUserData(req.user._id,postData);
      if(UpdateUserDetails){
        response.success = true;
        response.msg = constants.COMMON_MESSAGES.DATA_FOUND;
        response.data = UpdateUserDetails;
      }else{
        response.success = false;
        response.msg = customErrors.ERROR_CODES.USER_NOT_FOUND.MESSAGE;
      }
      return res.status(200).send(response);  
    });
  });
  


  module.exports = router;