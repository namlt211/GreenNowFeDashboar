import axios from "axios";
import { GET_CATEGORY_BY_ID_API } from "../config";
import getUserCookies from "./getUserCookies";
const getCategoryById = async (id) => {
  let data;
  let url = GET_CATEGORY_BY_ID_API.replace("${id}", id);
  let cookies = getUserCookies();
  if (cookies) {
    try {
      let result = await axios.get(url, {
        headers: { token: "Bearer " + cookies },
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
export default getCategoryById;
