import axios from "axios";
import { GET_PRODUCT_BY_CATEGORYID_API } from "../config";

const getProductByCategory = async (categoryId) => {
  let data;
  let url = GET_PRODUCT_BY_CATEGORYID_API.replace("${categoryid}", categoryId);
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (err) {
    data = err.message;
  }
  return data;
};

export default getProductByCategory;
