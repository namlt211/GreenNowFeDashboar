import axios from "axios";
import { LOGIN_API } from "../config";

const loginUser = async (user) => {
  let data;
  let url = LOGIN_API;
  try {
    await axios
      .post(url, user)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        data = error.message;
      });
  } catch (error) {
    data = error;
  }
  return data;
};
export default loginUser;
