"use strict";

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Schema = mongoose.Schema;

// @NOTE: geoJSon insert value like this { type: 'Point', coordinates: [-179.0, 0.0] }

const EventSchema = new Schema({
  //basic
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  game_mode: {
    type: String,
    required: false,
  },
  device_id: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
  },
  macaddress: {
    type: String,
  },
  login: {
    type: Boolean,
    require: true,
    default: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  //apptime
  appstarttime: {
    type: Date
  },
  appendtime: {
    type: Date
  },
  appstayintime: {
    type: Number
  },

  //game time
  gamestayintime: {
    type: Number,
    // required: true
  },
  game_enterTime: {
    type: Date,
  },
  game_exitTime: {
    type: Date,
  },
  //Login
  typephonetime: {
    type: Number
  },
  optsendtostarttype: {
    type: Number
  },
  otptypetime: {
    type: Number
  },
  //////////////////////////////////////////////////games/////////////////////////////////////////////////////////
  testid: {
    type: String,
  },
  eye: {
    type: String,
  },
  gamemode: {
    type: String,
  },
  result: {
    type: String,
  },
  testTime: {
    type: Number,
  },
  testCount: {
    type: Number,
  },
  rightcount: {
    type: Number,
  },
  falsecount: {
    type: Number,
  },

  ////////////////////singleTest///////////////

  singletestid: {
    type: String,
  },
  level: {
    type: Number,
  },

  //////////ex1////////
  direction: {
    type: String,
  },
  chooseddirection: {
    type: String,
  },
  e_direction: {
    type: String
  },
  textCount: {
    type: Number,
  },
  /////////////////ex2///////
  text: {
    type: String,
  },
  textreadcount: {
    type: String,
  },
  alispeechtext: {
    type: String,
  },
  alispeechrequesttime: {
    type: String,
  },
  alispeechresponsetime: {
    type: String,
  },
  alispeechresposejson: {
    type: String,
  },
  sound: {
    type: String,
  },
  soundlenth: {
    type: String,
  },
  soundsize: {
    type: String,
  },

  /////////////////////////////////////////lang
  lang: {
    type: String,
  },

  // data: {
  //     type: Object,
  //     required: false,
  //     default: ''
  // },
}, {
  strict: true,
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

EventSchema.on("index", (err) => {
  console.log(">>>>>>>>>>>>>>>", err);
});
module.exports = mongoose.model("Event", EventSchema);