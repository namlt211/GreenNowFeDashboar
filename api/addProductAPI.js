import axios from "axios";
import { ADD_PRODUCT_API } from "../config";
import getUserCookies from "./getUserCookies";
const addProductAPI = async (prod) => {
  let url = ADD_PRODUCT_API;
  let data;
  let cookies = getUserCookies();
  if (cookies) {
    data = await axios.post(url, prod, {
      headers: { token: "Bearer " + cookies },
    });
  } else {
    return "Token not valid";
  }
  return data;
};

export default addProductAPI;
