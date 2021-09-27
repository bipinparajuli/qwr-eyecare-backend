"use strict";

const Bluebird = require("bluebird"); 
const constants = require("../utils/constants");
const azureStorage = require('azure-storage');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twillioNumber = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);
// const WorkspaceModel = require("../models/workspace_model");
const path=require('path');

// const blobServiceWorkspace = azureStorage.createBlobService(process.env.AZURE_WORKSPACE_JSONFILE);

var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


const sendVerificationCode = function(postData){
    return Bluebird.try(async() =>{

      client.messages
      .create({
        body: 'QWR verification code : '+postData.otp+".",
        from: twillioNumber,
        to: "+"+postData.country_code+""+postData.mobile_number
      })
      .then(async(message)=>{ 
        console.log("message",message);   
        return message;
      });
    }).catch((error) => {
      console.error(error);
      return error;
    });
  };

  function sendMail(value) {
    const data = {
        from: `${process.env.MAILGUN_FROM_EMAIL}`,
        to: `${value.email}`,
        subject: `${value.subject}`,
        html: value['message']
    };
    mailgun.messages().send(data, (error, body) => {
        console.log("mail : ", body);
    });
    return { id:value._id }
}


// const sendCheckoutLink = function(messageBody,user){
//   return Bluebird.try(async() =>{
//     client.messages
//     .create({
//       body: messageBody,
//       from: twillioNumber,
//       to: "+"+user.country_code+""+user.mobile_number
//     })
//     .then(async(message)=>{ 
//       console.log("message",message);   
//       return message;
//     });
//   }).catch((error) => {
//     console.error(error);
//     return error;
//   });
// };


// const azurecreateWorkspaceContainerAndUploadJsonFile = function (containerName,imgArr) {
//   return Bluebird.try(async() => { 
//     return new Promise((resolve, reject) => {
//       blobServiceWorkspace.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' },async err => {
//       if (err) {
//         reject(err);
//         } else {
//           let urlArr = []
//           for (const file of imgArr) {
//             let filePath = path.resolve(file['path'])
//             let filename = path.basename(filePath)
//             await blobServiceWorkspace.createBlockBlobFromLocalFile(containerName, filename, filePath, err => {
//               if (err) {
//                 console.log("error : ", err)
//                 reject(err);
//               }
//             });
//             urlArr.push(blobServiceWorkspace.getUrl(containerName, filename))
//             if (imgArr.length === urlArr.length) {
//               resolve(filename);
//             }
//           }
//         }
//       });
//     });
//   }).catch((error) => {   
//     console.error(error);
//     return error;
//   });
// };


// const deleteExistingUpload = function (workspaceID,WorkspaceDetails) {
//   return Bluebird.try(async() => {
//     if(WorkspaceDetails.json_file && WorkspaceDetails.json_file != ''){

//       console.log("WorkspaceDetails.json_file : ",WorkspaceDetails.json_file)
//       console.log("workspaceID : ",workspaceID)
//       blobServiceWorkspace.deleteBlobIfExists(workspaceID, WorkspaceDetails.json_file, function(error, result) {
//         if (error) {
//             console.log("err : ",error);
//             return false;
//         } else {
//           console.log("successfully deleted Json file : ",result);
//           return true;
//         }
//       });
      
//     }else{
//       return false;
//     }
//   }).catch((error) => {   
//     console.error(error);
//     return error;
//   });
// };

// const deleteWorkspaceContainer = function (workspace_id) {
//   return Bluebird.try(async() => {
//     blobServiceWorkspace.deleteContainerIfExists(workspace_id, function(error, result, response){
//         if(!error){
//           console.log(' Workspace container deleted!');
//           return true;
//         }else{
//           console.log("Error : ",error);
//           return false;
//         }
//     });
//   }).catch((error) => {   
//     console.error(error);
//     return error;
//   });
// }; 

  module.exports = {
    sendVerificationCode:sendVerificationCode,
    sendMail:sendMail,
    // azurecreateWorkspaceContainerAndUploadJsonFile:azurecreateWorkspaceContainerAndUploadJsonFile,
    // deleteExistingUpload:deleteExistingUpload,
    // deleteWorkspaceContainer:deleteWorkspaceContainer,
    // sendCheckoutLink:sendCheckoutLink
  };