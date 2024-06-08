import axios from "axios";
import { BASE_URL } from "../../constants/api_tags";

const userLogin = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, userData);
  return res.data;
};

const firstTimeUserLogin = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/set-password`, userData);
  return res.data;
};

const editAccount = async (userData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    `${BASE_URL}/auth/change-password`,
    userData,
    config
  );
  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  userLogin,
  firstTimeUserLogin,
  editAccount,
  logout,
};

export default authService;
