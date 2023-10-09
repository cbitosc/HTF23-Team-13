const { model, Schema } = require("mongoose");
const event  = new Schema({
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
        default: false,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    amount:{
        type: Number,
    },
    contentType:{
        type: Boolean,
    }
})

module.exports = event;