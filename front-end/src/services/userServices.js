import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3000/";

const getGloabalEvents = async() => {
    const res = await axios.post(API_URL + "getAllEvents");
    console.log(res);
    return res.data;
  };

  const getEventDetails = (id) => {
    return axios.post(API_URL + "getEvent" , id,{ headers: authHeader() });
  };

  const registerEvent = async(userId,eventId)=>{
    const res= await axios.post(API_URL+"userRegisterEvent",{userId,eventId});
  }

  const createEvent = async(title,hostId,description,image,contentType ,amount, date,time)=>{
    const res = await axios.post(API_URL+"hostCreateEvent",{hostId,title,image,description,contentType,date});
    return res;
  }

  const getMyEvents = async(userId,type)=>{
      var res ;
      if (type=="user"){
          res = await axios.post(API_URL+"userEvents",{userId});
      }
      else{
          res = await axios.post(API_URL+"hostEvents",{userId}); 
      } 
      return res;
  } 
  
  const startEvent = async(hostId ,eventId)=>{
    const res = await axios.post(API_URL+"startEvent",{hostId,eventId});
    return res;
  }


const UserService = {
  getGloabalEvents,
  getEventDetails,
  registerEvent,
  getMyEvents,
  createEvent,
  startEvent,
};

export default UserService;