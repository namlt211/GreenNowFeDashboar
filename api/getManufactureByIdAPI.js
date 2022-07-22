import axios from "axios";
import { GET_MANUFACTURE_BY_ID } from "../config";

const getManufactureById = async (id) => {
  const url = GET_MANUFACTURE_BY_ID.replace("${id}", id);
  let data;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.data;
    });
  return data;
};
export default getManufactureById;
