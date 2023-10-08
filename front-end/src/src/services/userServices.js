import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:4001/";

const getGloabalEvents = () => {
    return axios.post(API_URL + "globalEvent");
  };

  const getEventDetails = (id) => {
    return axios.post(API_URL + "getEvent" , id,{ headers: authHeader() });
  };

const uploadDiet = (email,date,rows) => {
  const data = {
    email : email,
    date : date,
    rows : rows
  };
  return axios.post(API_URL + "diet", data, { headers: authHeader() });
};

const UserService = {
  getGloabalEvents,
  uploadDiet,
  getEventDetails
};

export default UserService;