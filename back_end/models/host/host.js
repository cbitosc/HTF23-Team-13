// import event from "./Event/event.js";
// import razorpay from "./razorpayDetails/razorpay"
const { model, Schema } = require("mongoose");
const event = require('../Event/event')
const razorpay = require("../razorpayDetails/razorpay")
const host = new Schema({
    hostId:{
        type: String,
    },
    displayName: {
        type: String,
      },
    firstName:{
        type: String,
    },
    lastName:{
        type:String,
    },
    email: {
        type: String,
    },
    password:{
        type:String
    },
    token:{
        type:String,
    },
    razorpayDetails:{
        type:razorpay,
    },
    events:[{
        type:String,

    }]
});

module.exports = model("host",host);