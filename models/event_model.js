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
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    data: {
        type: Object,
        required: false,
        default: ''
    },
   
     
}, { strict: true, timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

EventSchema.on("index", (err) => { console.log(">>>>>>>>>>>>>>>", err); });
module.exports = mongoose.model("Event", EventSchema);

