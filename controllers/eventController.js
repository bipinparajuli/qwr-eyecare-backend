"use strict";

const Bluebird = require("bluebird");

const EventModel = require("../models/event_model");
const constants = require("../utils/constants");
const utils = require("../utils/utils");
const crypto = require('crypto');
const mongodb = require('mongodb');



const addEvent = function (postData) {
  return Bluebird.try(() => {
    let Event = new EventModel(postData);
    return Event.save()
      .then((isSaved) => {
        return EventModel.findById(isSaved._id).lean();
      });
  }).catch((error) => {
    console.error(error);
    return error;
  });
};

// const checkWorkspaceExist = function(name,user_id){
//   return Bluebird.try(async() => {
//     let workspaceInfo = await WorkspaceModel.findOne({user_id:user_id,name:name}).lean();
//     return workspaceInfo;
//   }).catch((error) => {   
//       console.error(error);
//       return error;
//   });
// };

// const findEventById = function(event_id){
//   return Bluebird.try(async() => {
//     let EventInfo = await EventModel.findById(event_id).lean();
//     return EventInfo;
//   }).catch((error) => {   
//       console.error(error);
//       return error;
//   });
// };

// const updateWorkspaceData = function(workspace_id,data){
//   return Bluebird.try(async() => {
//     return WorkspaceModel.findOneAndUpdate({_id:workspace_id},{$set:data},{new:true}).lean();
//   }).catch((error) => {
//     console.error(error);
//     return error;
//   });
// };


const getEventList = function (user_id) {
  return Bluebird.try(async () => {
    let EventInfo = await EventModel.find({
      user_id: user_id
    }).lean();
    return EventInfo;
  }).catch((error) => {
    console.error(error);
    return error;
  });
};


// const deleteWorkspace = function(workspace_id){
//   return Bluebird.try(async() => {  
//     return WorkspaceModel.remove({_id:workspace_id}).lean();
//   }).catch((error) => {
//     console.error(error);
//     return error;
//   });
// };



// const saveCheckoutData = function (postData) {
//   return Bluebird.try(async() => { 
//     let WorkspaceCheckout = new CheckoutWorkspaceModel(postData);
//     return WorkspaceCheckout.save()
//     .then((isSaved)=>{    
//       return CheckoutWorkspaceModel.findById(isSaved._id).lean();
//     });
//   }).catch((error) => {   
//     console.error(error);
//     return error;
//   });
// };


module.exports = {
  addEvent: addEvent,
  // checkWorkspaceExist:checkWorkspaceExist,
  // findEventById:findEventById,
  // updateWorkspaceData: updateWorkspaceData,
  getEventList: getEventList,
  // deleteWorkspace:deleteWorkspace,
  // saveCheckoutData:saveCheckoutData
};