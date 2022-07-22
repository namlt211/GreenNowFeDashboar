import axios from "axios";
import { LOGOUT_API } from "../config";
import getUserCookies from "../api/getUserCookies";
const logoutAPI = async (refreshToken) => {
  let url = LOGOUT_API;
  let data;
  const cookies = getUserCookies();
  if (cookies) {
    try {
      await axios
        .post(url, refreshToken, {
          headers: { token: "Bearer " + cookies },
        })
        .then((response) => {
          data = response.data;
        })
        .catch((err) => {
          data = err.message;
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    return "Token not valid";
  }
  return data;
};
export default logoutAPI;
