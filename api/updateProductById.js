import axios from "axios";
import { UPDATE_PRODUCT_API } from "../config";
import getUserCookies from "./getUserCookies";

const updateProductById = async (id, product) => {
  let url = UPDATE_PRODUCT_API.replace("${id}", id);
  const cookies = getUserCookies();
  let data;
  if (cookies) {
    let result = await axios.post(url, product, {
      headers: { token: "Bearer " + cookies },
    });
    data = result.data;
  } else {
    return "Token not valid";
  }
  return data;
};

export default updateProductById;
