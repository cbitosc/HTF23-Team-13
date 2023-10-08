const { model, Schema } = require("mongoose");

const razorpay = new Schema({
    key_id:{
        type: String,
    },
    secret_key:{
        type: String,
    }
})
module.exports = razorpay;