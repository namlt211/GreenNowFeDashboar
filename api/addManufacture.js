import axios from "axios";
import { ADD_MANUFACTURE_API } from "../config";
import getUserCookies from "./getUserCookies";

const addManufacture = async (manufacture) => {
  let url = ADD_MANUFACTURE_API;
  let data;
  const cookies = getUserCookies();
  if (cookies) {
    try {
      let result = await axios.post(url, manufacture, {
        headers: { token: "Bearer " + cookies },
      });
      data = result.data;
    } catch (e) {
      data = e.response;
    }
  } else {
    return "Token not valid";
  }
  return data;
};
export default addManufacture;
