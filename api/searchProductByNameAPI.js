import axios from "axios";
import { SEARCH_PRODUCT_BY_NAME } from "../config";

const searchProductByName = async (key) => {
  let url = SEARCH_PRODUCT_BY_NAME.replace("${key}", key);
  let data;
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (err) {
    data = err.response;
  }
  return data;
};
export default searchProductByName;
