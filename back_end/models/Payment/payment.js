
const { model, Schema } = require("mongoose");
const event = require('../Event/event')

const payment = new Schema({
    paymentId:{
        type: String,
    },
    eventId:{
        type: String,
    }
});

module.exports = payment;