import axios from "axios";
import { DELETE_MANUFACTURE_BY_ID } from "../config";
import getUserCookies from "./getUserCookies";

const deleteManufactureById = async (id) => {
  let url = DELETE_MANUFACTURE_BY_ID.replace("${id}", id);
  const cookies = getUserCookies();
  let data;
  if (cookies) {
    await axios
      .get(url, { headers: { token: "Bearer " + cookies } })
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        data = error;
      });
  } else {
    return "Token not valid";
  }
  return data;
};
export default deleteManufactureById;
