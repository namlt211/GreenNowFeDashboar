import axios from "axios";

import { GET_ALL_CATEGORY_API } from "../config";

const getAllCategories = async () => {
  let data;
  let url = GET_ALL_CATEGORY_API;
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (err) {
    console.error(err);
  }
  return data;
};
export default getAllCategories;
