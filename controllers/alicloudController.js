"use strict";

const Bluebird = require("bluebird");
// const AiJobModel = require("../models/aijob_model");
// const commonFunctionsController = require("./commonFunctions");
const constants = require("../utils/constants");
// const utils = require("../utils/utils");
// const crypto = require('crypto');
const mongodb = require('mongodb');
var RPCClient = require('@alicloud/pop-core').RPCClient;

var client = new RPCClient({
    accessKeyId: process.env.ALICLOUD_KEY_ID,
    accessKeySecret: process.env.ALICLOUD_KEY_SECRET,
    endpoint: 'http://nls-meta.cn-shanghai.aliyuncs.com',
    apiVersion: '2019-02-28'
});


const createToken = function () {
    return Bluebird.try(async () => {
        return client.request('CreateToken').then((result) => {
            console.log(result.Token);
            return result.Token;
        });

    }).catch((error) => {
        console.error(error);
        return error;
    });
}

module.exports = {
    createToken: createToken,
};