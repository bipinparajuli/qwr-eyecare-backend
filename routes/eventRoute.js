"use strict";

const router = require("express-promise-router")();
const Bluebird = require("bluebird");
const EventController = require("../controllers/eventController");
const constants = require("../utils/constants");
const commonFunctionController = require("../controllers/commonFunctions");
const authetication = require("../middleware/authentication");




router.post("/create-event", [authetication.authenticate], function (req, res, next) {
  return Bluebird.try(async () => {
    let response = {
      success: false
    };
    let postData = req.body;
    postData.user_id = req.user._id;
    let saveEvent = await EventController.addEvent(postData);
    if (saveEvent) {
      response.success = true;
      response.msg = "Event created successfully";
      response.data = saveEvent;
    } else {
      response.success = false;
      response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
    }
    return res.status(200).send(response);
  });
});

// router.post("/update-workspace",[authetication.authenticate], function (req, res, next) {
//   return Bluebird.try(async() => {

//     let uploadImg = Bluebird.promisify(uploadWorkspaceFile.array('json_file', 10));
//     return uploadImg(req, res).then(async(data) => {

//       let response = {success:false}; 

//       let postData = req.body;
//       let workspace_id = postData.workspace_id;

//       let getWorkspaceById = await WorkspaceController.findWorkspaceById(workspace_id);
//       if(getWorkspaceById){ 

//         //let deleteFileIfExist = await  commonFunctionController.deleteExistingUpload(workspace_id,getWorkspaceById);

//         let createContainerAndUploadJsonFile = await  commonFunctionController.azurecreateWorkspaceContainerAndUploadJsonFile(workspace_id,req.files);
//         if(createContainerAndUploadJsonFile){

//           let updateData = {
//             property_id:postData.property_id,
//             json_file:createContainerAndUploadJsonFile,
//           }

//           let updateWorkspaceData = await WorkspaceController.updateWorkspaceData(workspace_id,updateData);
//           if(updateWorkspaceData){
//             response.success = true;
//             response.msg = constants.COMMON_MESSAGES.DATA_UPDATED;

//             updateWorkspaceData.json_file = await blobServiceWorkspace.getUrl(workspace_id, updateWorkspaceData.json_file);

//             response.data = updateWorkspaceData;
//           }else{
//             response.success = false;
//             response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
//           }

//           return res.status(200).send(response); 
//         }else{
//           response.success = false;
//           response.msg = "Something went wrong while uploading workspace on azure";

//           return res.status(200).send(response); 
//         }

//       }else{  
//         response.success = false;
//         response.msg = "Workspace does not exist";

//         return res.status(200).send(response); 
//       }

//     });
//   });
// });


router.get("/list-events", [authetication.authenticate], function (req, res, next) {
  return Bluebird.try(async () => {
    let response = {
      success: false
    };
    let postData = req.body;
    let getEventList = await EventController.getEventList(req.user._id);
    if (getEventList.length > 0) {
      response.success = true;
      response.msg = constants.COMMON_MESSAGES.DATA_FOUND;
      response.data = getEventList;
    } else {
      response.success = false;
      response.msg = "No workspace found, Please create new workspace";
    }
    return res.status(200).send(response);
  });
});


// router.get("/get-workspace-details/:workspace_id",[authetication.authenticate], function (req, res, next) {
//   return Bluebird.try(async() => {
//     let response = {success:false}; 
//     let postData = req.body;
//     let workspace_id = req.params.workspace_id;
//     let getWorkspaceDetails = await WorkspaceController.findWorkspaceById(workspace_id);
//     if(getWorkspaceDetails){

//       if(getWorkspaceDetails.json_file && getWorkspaceDetails.json_file != ''){

//         getWorkspaceDetails.json_file = await blobServiceWorkspace.getUrl(workspace_id, getWorkspaceDetails.json_file);

//         response.success = true;
//         response.msg = constants.COMMON_MESSAGES.DATA_FOUND;
//         response.data = getWorkspaceDetails;

//       }else{
//         response.success = true;
//         response.msg = "Empty workspace data";
//         response.data = {};
//       }
//     }else{
//       response.success = false;
//       response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
//     }
//     return res.status(200).send(response);
//   });
// });


// router.get("/delete-workspace/:workspace_id",[authetication.authenticate], function (req, res, next) {
//   return Bluebird.try(async() => {
//     let response = {success:false}; 
//     let postData = req.body;
//     let workspace_id = req.params.workspace_id;
//     let getWorkspaceDetails = await WorkspaceController.findWorkspaceById(workspace_id);
//     if(getWorkspaceDetails){

//       //let deleteWorkspaceContainer = await  commonFunctionController.deleteWorkspaceContainer(workspace_id);

//       let deleteWorkspace = await WorkspaceController.deleteWorkspace(workspace_id);

//       if(deleteWorkspace){
//         response.success = true;
//         response.msg = "Workspace deleted successfully";
//         response.data = {};
//       }else{
//         response.success = false;
//         response.msg = "Something went wrong while deleting workspace";
//         response.data = {};
//       }

//     }else{
//       response.success = false;
//       response.msg = "Workspace does not exist";
//       response.data = {};
//     }
//       return res.status(200).send(response);
//   });
// });

// router.post("/checkout",[authetication.authenticate], function (req, res, next) {
//   return Bluebird.try(async() => {
//     let response = {success:false}; 
//     let postData = req.body;
//     postData.user_id = req.user._id;
//     let saveCheckoutData = await WorkspaceController.saveCheckoutData(postData);
//     if(saveCheckoutData){

//       let messageBody = 'Hello '+req.user.name+' Please click on this link to view the property in 360 '+saveCheckoutData.preview_url;

//       let messageBodyForEmail = 'Hello '+req.user.name+' Please click on this link to view the property in 360 '+saveCheckoutData.preview_url;

//       if(saveCheckoutData.checkout_url != ''){
//         messageBody += '\nComplete your order by making the payment using the following link '+saveCheckoutData.checkout_url;
//         messageBodyForEmail += '<br> Complete your order by making the payment using the following link '+saveCheckoutData.checkout_url;
//       }

//       let sendCheckoutLink = await commonFunctionController.sendCheckoutLink(messageBody,req.user);

//       let result={
//         id:req.user._id,
//         email:req.user.email,
//         subject:'Your EdificeVR Order is ready! || EdificeVR',
//         message:messageBodyForEmail
//       }

//       commonFunctionController.sendMail(result);

//       //Complete your order by making the payment using the following link

//       response.success = true;
//       response.msg = "Checkout successfull";
//       response.data = saveCheckoutData;

//     }else{
//       response.success = false;
//       response.msg = "Something went wrong, Please try again";
//       response.data = {};
//     }

//     return res.status(200).send(response);
//   });
// });

module.exports = router;