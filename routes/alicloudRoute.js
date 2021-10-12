"use strict";

const router = require("express-promise-router")();
const Bluebird = require("bluebird");
// const rp = require('request-promise');

const AliCloudController = require("../controllers/alicloudController");

const constants = require("../utils/constants");
const utils = require("../utils/utils");
const authetication = require("../middleware/authentication");
// const commonFunctionsController = require("../controllers/commonFunctions");
// const multer = require("multer");
// const fs = require("fs")

router.get("/create-token/", [authetication.authenticate], function (req, res, next) {
    return Bluebird.try(async () => {
      let response = {
        success: false
      };
      let createToken = await AliCloudController.createToken();
      if (createToken) {
        response.success = true;
        response.msg = "Successfully created token";
        response.data = createToken;
      } else {
        response.success = false;
        response.msg = constants.COMMON_ERROR_MESSAGES.DEFAULT_ERROR;
      }
      return res.status(200).send(response);
    });
  });;

module.exports = router;
