"use strict";

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Schema = mongoose.Schema;

// @NOTE: geoJSon insert value like this { type: 'Point', coordinates: [-179.0, 0.0] }

const UsersSchema = new Schema({

    email:{
        type:String,
        // unique: true,
        required:false
    },
    name: {
        type: String,
        required: false
    },
    mobile_number: {
        type: Number,
        unique: true,
        required: true
    },
    country_code: {
        type: Number,
        default:91,
        required:false
    },
    otp: {
        type: Number,
        default:0,
        required:false
    },
    status: {
        type: String,
        enum: ["verified","not_verified"],
        default:"not_verified",
        required:false,
    },
    loggedInAt: {
        type: Date,
        default: Date.now
        // required: true
    },  
    firstLogin: {
        type: Date,
        default: Date.now
    },
    isOnboarded: {
        type: String,
        enum: ["true","false"],
        default:"false",
        required:false,
    }

}, { strict: true, timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

UsersSchema.on("index", (err) => { console.log(">>>>>>>>>>>>>>>", err); });
module.exports = mongoose.model("User", UsersSchema);

