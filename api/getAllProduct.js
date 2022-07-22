import axios from "axios";
import { GET_ALL_PRODUCT_API } from "../config";

const getAllProductList = async () => {
  let data;
  let url = GET_ALL_PRODUCT_API;
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (err) {
    data = err;
  }
  return data;
};
export default getAllProductList;
