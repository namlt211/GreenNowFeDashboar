import Cookies from "js-cookie";

const getCookies = () => {
  return Cookies.get("user");
};
export default getCookies;
