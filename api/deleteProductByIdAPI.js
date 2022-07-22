import axios from "axios";
import { DELETE_PRODUCT_BY_ID_API } from "../config";
import getUserCookies from "./getUserCookies";
const deleteProductById = async (id) => {
  let data;
  let url = DELETE_PRODUCT_BY_ID_API.replace("${id}", id);
  //    let url = DELETE_CATEGORY_API.replace("${id}", id);
  const cookies = getUserCookies();
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

export default deleteProductById;
