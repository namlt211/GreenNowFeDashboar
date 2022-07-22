import axios from "axios";
import { FIND_MANUFACTURE_BY_NAME } from "../config";

const findManufactureByName = async (name) => {
  const url = FIND_MANUFACTURE_BY_NAME.replace("${name}", name);
  let data;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      data = err.message;
    });
  return data;
};

export default findManufactureByName;
