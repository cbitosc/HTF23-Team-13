// import event from './Event/event'
const event = require('../Event/event')
const { model, Schema } = require("mongoose");

const globalEvents = new Schema({
    eventId:{
        type: String,
    },
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    image:{
        type: Buffer,
        contentType:String,
    },
    date:{
        type: Date,
    },
    hostId:{
        type: String,
    },
    streamId:{
        type: String,
        default: null,
    },
    started:{
        type: Boolean,
    },
    completed:{
        type: Boolean,
    }

})

module.exports = model("globalEvents",globalEvents);