import axios from "axios";
import { GET_ALL_CATEGORY_FOR_PRODUCT_API } from "../config";
import getUserCookies from "./getUserCookies";
const getAllCategoryForProduct = async () => {
  let data;
  let url = GET_ALL_CATEGORY_FOR_PRODUCT_API;
  let cookies = getUserCookies();
  if (cookies) {
    try {
      await axios
        .get(url, { headers: { token: "Bearer " + cookies } })
        .then((response) => {
          data = response.data;
        })
        .catch((error) => {
          data = error.message;
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    return "Token not valid";
  }
  return data;
};

export default getAllCategoryForProduct;
