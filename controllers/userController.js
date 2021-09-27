"use strict";

const Bluebird = require("bluebird"); 
const UserModel = require("../models/user_model");
const constants = require("../utils/constants");
const utils = require("../utils/utils");
const crypto = require('crypto');
const mongodb = require('mongodb');

  const createNewUser = function (userData) {
    return Bluebird.try(() => { 
      let User = new UserModel(userData);
      return User.save()
      .then((isSaved)=>{    
        return UserModel.findById(isSaved._id).lean();
      });
    }).catch((error) => {   
      console.error(error);
      return error;
    });
  };

  const checkUserEmailExists = function(email){
    return Bluebird.try(async() => {
      let userInfo = await UserModel.findOne({email:email}).lean();
      return userInfo;
    }).catch((error) => {   
        console.error(error);
        return error;
    });
  };

  const checkUsernameExists = function(username){
    return Bluebird.try(async() => {
      let userInfo = await UserModel.findOne({username:username}).lean();
      return userInfo;
    }).catch((error) => {   
        console.error(error);
        return error;
    });
  };

  const findUserByEmailOrNumber = function(email){
    return Bluebird.try(async() => {
      //check email field contains only digit
      if(/^\d+$/.test(email)){
        let userInfo = await UserModel.findOne({mobile_number:parseInt(email)}).lean();
        return userInfo;
      }else{
        let userInfo = await UserModel.findOne({email:email}).lean();
        return userInfo;
      }
    }).catch((error) => {   
      console.error(error);
      return error;
    });
  };

  const CheckFieldValueExist = function(query){
    return Bluebird.try(async() => {
      let returnData = await UserModel.findOne(query).lean();
      return returnData;
    }).catch((error) => {   
        console.error(error);
        return error;
    });
  }

  const findUserById = function(user_id){
    return Bluebird.try(async() => {
      let userInfo = await UserModel.findById(user_id).lean();
      return userInfo;
    }).catch((error) => {   
        console.error(error);
        return error;
    });
  };

  const updatedUserData = function(userId,data){
    return Bluebird.try(async() => {
      return UserModel.findOneAndUpdate({_id:userId},{$set:data},{new:true}).lean();
    }).catch((error) => {
      console.error(error);
      return error;
    });
  };
  

  module.exports = {
    createNewUser:createNewUser,
    checkUserEmailExists:checkUserEmailExists,
    checkUsernameExists:checkUsernameExists,
    findUserByEmailOrNumber:findUserByEmailOrNumber,
    findUserById:findUserById,
    CheckFieldValueExist:CheckFieldValueExist,
    updatedUserData:updatedUserData
  };