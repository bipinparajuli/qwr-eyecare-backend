"use strict";

const Bluebird = require("bluebird");
const constants = require("../utils/constants");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twillioNumber = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);
const path = require('path');

var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});


const sendVerificationCode = function (postData) {
  return Bluebird.try(async () => {

    client.messages
      .create({
        body: 'QWR verification code : ' + postData.otp + ".",
        from: twillioNumber,
        to: "+" + postData.country_code + "" + postData.mobile_number
      })
      .then(async (message) => {
        console.log("message", message);
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
  return {
    id: value._id
  }
}

module.exports = {
  sendVerificationCode: sendVerificationCode,
  sendMail: sendMail
};