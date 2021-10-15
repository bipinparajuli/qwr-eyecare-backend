"use strict";

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Schema = mongoose.Schema;

// @NOTE: geoJSon insert value like this { type: 'Point', coordinates: [-179.0, 0.0] }

const EventSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    game_mode: {
        type: String,
        required: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    datetime: {
        type: String,
        required: true
    },
    device_id: {
        type: String,
        required: true
    },
    // left_eye:{
    //     type: Number,
    // },
    // right_eye:{
    //     type: Number,
    // },
    stayintime: {
        type: Number,
        // required: true
    },
    eye: {
        type: String,
        // required: true
    },
    testid: {
        type: String,
        // required: true
    },
    gamemode: {
        type: String,
        // required: true
    },
    result: {
        type: String,
        // required: true
    },
    testCount: {
        type: Number,
        // required: true
    },
    rightcount: {
        type: Number,
        // required: true
    },
    falsecount: {
        type: Number,
        // required: true
    },
    level: {
        type: Number,
        // required: true
    },
    direction: {
        type: String,
        // required: true
    },
    Eid: {
        type: String,
        // required: true
    },
    eyetestid: {
        type: String,
        // required: true
    },
    chooseddirection: {
        type: String,
        // required: true
    },
    showedEid: {
        type: String,
        // required: true
    },
    requestjson: {
        type: String,
        // required: true
    },
    responsejson: {
        type: String,
        // required: true
    },
    textCount: {
        type: Number,
        // required: true
    },
    text: {
        type: String,
        // required: true
    },
    textID: {
        type: String,
        // required: true
    },
    aliresult: {
        type: String,
        // required: true
    },
    textreadcount: {
        type: String,
        // required: true
    },
    singletestid: {
        type: String,
        // required: true
    },
    sound: {
        type: String,
        // required: true
    },
    soundlenth: {
        type: String,
        // required: true
    },
    soundsize: {
        type: String,
        // required: true
    },
    alitext: {
        type: String,
        // required: true
    },
    message: {
        type: String,
        // required: true
    },
    lang: {
        type: String,
        // required: true
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
        updatedAt: "updatedAt"
    }
});

EventSchema.on("index", (err) => {
    console.log(">>>>>>>>>>>>>>>", err);
});
module.exports = mongoose.model("Event", EventSchema);