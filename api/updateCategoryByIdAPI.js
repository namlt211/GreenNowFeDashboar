import axios from "axios";
import { UPDATE_CATEGORY_API } from "../config";
import getUserCookies from "./getUserCookies";

const updateCategory = async (id, category) => {
  let url = UPDATE_CATEGORY_API.replace("${id}", id);
  let data;
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
      data = err.response;
    }
  } else {
    return "Token not valid";
  }
  return data;
};
export default updateCategory;
