import axios from "axios";
import { GET_PRODUCT_BY_ID_API } from "../config";

const getProductById = async (id) => {
  let url = GET_PRODUCT_BY_ID_API.replace("${id}", id);
  let data;
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (err) {
    data = err.response;
  }
  return data;
};

export default getProductById;
