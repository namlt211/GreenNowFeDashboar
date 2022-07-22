import axios from "axios";
import { GET_MANUFACTURE_BY_STATUSID_API } from "../config";

const getManufactureByStatusIdApi = async (statusid) => {
  let data;
  const url = GET_MANUFACTURE_BY_STATUSID_API.replace("${statusid}", statusid);
  try {
    let result = await axios.get(url);
    data = result.data;
  } catch (err) {
    data = err.message;
  }
  return data;
};
export default getManufactureByStatusIdApi;
