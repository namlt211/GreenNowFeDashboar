import axios from "axios";
import { UPDATE_MANUFACTURE_BY_ID } from "../config";
import getUserCookies from "./getUserCookies";

const updateManufactureById = async (id, manufacturer) => {
  const url = UPDATE_MANUFACTURE_BY_ID.replace("${id}", id);
  const cookies = getUserCookies();
  let data;
  if (cookies) {
    await axios
      .post(url, manufacturer, {
        headers: { token: "Bearer " + cookies },
      })
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

export default updateManufactureById;
