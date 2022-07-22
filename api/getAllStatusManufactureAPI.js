import axios from "axios";
import { GET_ALL_STATUS_MANUFACTURE_API } from "../config";

const getAllStatusManufacture = async () => {
  let data;
  let url = GET_ALL_STATUS_MANUFACTURE_API;
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (e) {
    data = e;
  }
  return data;
};
export default getAllStatusManufacture;
