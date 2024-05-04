import axios from "axios";

const API_URL = "http://localhost:8000/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  //get profile picture urls here
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(API_URL + "logout");

  if (response.data) {
    localStorage.removeItem("user");
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
