"use strict";

const Bluebird = require("bluebird");
const constants = require("../utils/constants");

// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const twillioNumber = process.env.TWILIO_NUMBER;

// const client = require('twilio')(accountSid, authToken);
const Core = require('@alicloud/pop-core');
const path = require('path');

var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});

var client = new Core({
    accessKeyId: process.env.ALICLOUD_KEY_ID,
    accessKeySecret: process.env.ALICLOUD_KEY_SECRET,
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});

var params = {
  "SignName": "二爻科技",
  "TemplateCode": "SMS_197880224",
}

var requestOption = {
  method: 'POST'
};

const sendVerificationCode = function (postData) {
  return Bluebird.try(async () => {

    params.PhoneNumbers = postData.mobile_number
    params.TemplateParam = `{"code":"${postData.otp}"}`;

    client.request('SendSms', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
    }, (ex) => {
      console.log(ex);
    })
    
    // client.messages
    //   .create({
    //     body: 'QWR verification code : ' + postData.otp + ".",
    //     from: twillioNumber,
    //     to: "+" + postData.country_code + "" + postData.mobile_number
    //   })
    //   .then(async (message) => {
    //     console.log("message", message);
    //     return message;
    //   });
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
  return {
    id: value._id
  }
}

module.exports = {
  sendVerificationCode: sendVerificationCode,
  sendMail: sendMail
};