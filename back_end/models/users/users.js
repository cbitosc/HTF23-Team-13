// import payment from "./Payment/payment.js"

// import event from "./Event/event.js"
const { model, Schema } = require("mongoose");
const event = require('../Event/event')
const payment = require('../Payment/payment')
// in the user schema, we store:
// the details necessary for the messaging
// rooms, to keep track of previously visited room

const userSchema = new Schema({
  userId: {
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
  token:{
    type: String,
  },
  password:{
    type: String,
  },
  payments:[payment],
  events:[{
    type: String,
  }]

});

module.exports = model("User", userSchema);