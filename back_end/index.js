const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/users/users");
const Host = require("./models/host/host");
const event = require("./models/Event/event");
const globalEvents = require("./models/Globalevents/globalevents");
const db = require("./db/db").connect();
const uuid = require("uuid");
const dotenv = require("dotenv");
const paymentRoutes = require("./Routes/payments");
dotenv.config();
// app.use(auth);
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/payment/", paymentRoutes);

app.post("/userlogin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.userId, email },
        'secret',
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      // console.log(user)

      // user
      res.status(200).json({type:"user",user});
    }
  } catch (err) {
    res.send(err);
  }
});
app.post("/hostlogin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await Host.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      console.log(user);

      const token = jwt.sign(
        { user_id: user.hostId, email },
        'secret',
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({type:"host",user});
    }
  } catch (err) {
    res.send(err);
  }
});

app.post("/userRegister", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Input validation
    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("All input is required");
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create a new userID
    const userId = uuid.v4();
    const token = jwt.sign({ user_id: userId, email: email }, "secret", {
      expiresIn: "2h",
    });
    // Create a new user
    const newUser = new User({
      userId: userId,
      displayName: firstName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      token: token,
      password: encryptedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Host Registration Route
app.post("/hostRegister", async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    // Input validation
    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("All input is required");
    }

    // Check if host with the same email already exists
    const existingHost = await Host.findOne({ email });
    if (existingHost) {
      return res.status(400).send("Host with this email already exists");
    }

    // Create a new host
    const hostId = uuid.v4();

    const token = jwt.sign({ user_id: hostId, email: email }, "secret", {
      expiresIn: "2h",
    });
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create new hostId

    const newHost = new Host({
      hostId: hostId,
      displayName: firstName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      token: token,
    });

    // Save the host to the database
    await newHost.save();

    res.status(201).send(token);
    // res.send(token)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/getAllevents", async (req, res) => {
  const response = await globalEvents.find({});
  res.send(response);
});

app.post("/hostCreateEvent", async (req, res) => {
  try {
    const { hostId, title, date,amount, description,started,contentType,image} = req.body;
    if (!(hostId && title && date && description && contentType)) {
      return res.status(400).send("All input is required");
    }
    const host = await Host.findOne({ hostId });
    // console.log(host)
    if (host) {
      const eventId = uuid.v4();
      // console.log(existingHost);
      // const newEvent = event();
      await globalEvents({
        eventId: eventId,
        hostId: hostId,
        title: title,
        description: description,
        started: started,
        image:image,
        contentType: contentType,
        amount:amount,
      }).save()
      // const user= await Host.findOne({hostId:hostId});
      var events= host.events;
      const event = await globalEvents.findOne({eventId:eventId});
      console.log(event);

      events.push(event.eventId);
      console.log(events);
      const filter = {hostId: hostId};
      const update = {$set:{events:events}}
      await Host.updateOne(filter,update)
      // await newEvent.save();
    } else {
      res.send("Host does not exist");
    }
    res.send("Event registerd successfully");
  } catch (err) {
    res.send(err);
  }
});

app.post("/userRegisterEvent",async(req,res)=>{
  try {
    const { userId, eventId } = req.body;
    console.log({userId,eventId})
    if (!(userId && eventId)) {
      return res.status(400).send("All input is required");
    }
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      // console.log(existingUser);
      const user= await User.findOne({userId:userId});
      var events= user.events;
      const event = await globalEvents.findOne({eventId:eventId});
      events.push(event.eventId);
      // console.log(events);
      const filter = {userId: userId};
      const update = {$set:{events:events}}
      await User.updateOne(filter,update)
      
      // await newEvent.save();
    } else {
      res.send("User does not exist");
    }
    res.send("Event registerd successfully");
  } catch (err) {
    res.send(err);
  }
});

app.post("/hostEvents",async(req,res)=>{
  try {
    const {hostId}= req.body;
    if (hostId){
      const host = await Host.findOne({hostId:hostId});
      console.log(host)
 
      const hostEvents= host.events;
      const eventDetails = await globalEvents.find({eventId:{$in:hostEvents}})
      res.send(eventDetails);
    }
    else{
      res.send("hostId not found");
    }
    // res.send('h')
  } catch (error) {
    res.send(error);
  } 
}); 
app.post("/userEvents",async(req,res)=>{
  try {
    const {userId}= req.body;
    console.log(userId);
    if (userId){
      const user = await User.findOne({userId});
      console.log(user);
      const userEvents= user.events;
      // const eventDetails = await globalEvents.find({eventId:{$in:userEvents}})
      res.send(userEvents);
    }
    else{
      res.send("userId not found");
    }
    // res.send('h')
  } catch (error) {
    res.send(error);
  }
});

app.post("/getEvent",async(req,res)=>{
  try {
    const {eventId} = req.body;
    console.log(eventId)
    if (eventId){
      const event = await globalEvents.findOne({eventId:eventId})
      console.log(event);
      res.send(event);
    }
  } catch (error) {
    res.send(err);
  }
})

app.post("/startEvent",async(req,res)=>{
  try {
    const {hostId,eventId} = req.body
    const event = await globalEvents.findOne({eventId});
    if (event.hostId= hostId){
      const filter= {eventId:eventId}
      const streamId= uuid.v4();
      const update={ $set:{streamId:streamId,started:true}}
      await globalEvents.updateOne(filter,update);
      res.send(streamId);
    }
    
  } catch (error) {
    res.send(err);
  }
})
app.listen(3000, console.log("listening to port 3000"));
