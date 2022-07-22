import axios from "axios";
import { ADD_CATEGORY_API } from "../config";
import getUserCookies from "./getUserCookies";
const addCategory = async (category) => {
  let data;
  let url = ADD_CATEGORY_API;
  const cookies = getUserCookies();
  if (cookies) {
    try {
      let result = await axios.post(url, category, {
        headers: {
          token: "Bearer " + cookies,
        },
      });
      data = result.data;
    } catch (err) {
      data = err.response.data;
    }
  } else {
    return "Token not valid";
  }
  return data;
};
export default addCategory;
