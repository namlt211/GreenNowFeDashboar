import axios from "axios";
import { GET_ALL_STATUS_API } from "../config";

const getAllStatus = async () => {
  let url = GET_ALL_STATUS_API;
  let data;
  try {
    const result = await axios.get(url);
    data = result.data;
  } catch (err) {
    data = err.response;
  }
  return data;
};

export default getAllStatus;
