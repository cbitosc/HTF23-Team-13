import axios from "axios";

const API_URL = "http://localhost:3000/";

const registeru = async (first_name,last_name, email, password) => {
  const response = await axios.post(API_URL + "registeru", {
    first_name,
    last_name,
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(response.data));
};

const registero = async (first_name,last_name, email, password,key_id,secert_key) => {
  const response = await axios.post(API_URL + "registero", {
    first_name,
    last_name,
    email,
    password,
    key_id,
    secert_key,
  });
  localStorage.setItem("user", JSON.stringify(response.data));
};

const loginHost = async (email, password) => {
  const response = await axios.post(API_URL + "hostlogin", {
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
};
const loginUser = async (email, password) => {
  const response = await axios.post(API_URL + "userlogin", {
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  registeru,
  registero,
  loginHost,
  loginUser,
  logout,
  getCurrentUser,
};

export default authService;