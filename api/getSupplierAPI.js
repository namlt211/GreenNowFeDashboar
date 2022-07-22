import axios from "axios";
import { GET_ALL_MANUFACTURE_API } from "../config";

const getSupplier = async () => {
  let url = GET_ALL_MANUFACTURE_API;
  let data;
  await axios
    .get(url)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (err) {
      data = err.message;
    });
  return data;
};
export default getSupplier;
