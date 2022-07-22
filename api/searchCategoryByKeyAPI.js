import axios from "axios";
import { SEARCH_CATEGORY_BY_SEARCHKEY_API } from "../config";

const searchCategory = async (key) => {
  let url = SEARCH_CATEGORY_BY_SEARCHKEY_API.replace("${key}", key);
  let data;
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (err) {
    data = err.response;
  }
  return data;
};

export default searchCategory;
