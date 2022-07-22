import axios from "axios";
import { DELETE_CATEGORY_API } from "../config";
import getUserCookies from "./getUserCookies";
const deleteCategoryAPI = async (id) => {
  let data;
  let url = DELETE_CATEGORY_API.replace("${id}", id);
  let cookies = getUserCookies();
  if (cookies) {
    try {
      await axios
        .get(url, { headers: { token: "Bearer " + cookies } })
        .then((response) => {
          data = response.data;
        })
        .catch((error) => {
          data = error.response;
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    return "Token not valid";
  }

  return data;
};
export default deleteCategoryAPI;
