import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Layout1 from "./layout1";
import Layout from "./layout2";
const Index = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(Cookies.get("user"));
  }, [Cookies.get("user")]);
  return (
    <div>
      {user !== undefined ? (
        <div>
          <Layout />
        </div>
      ) : (
        <div>
          <Layout1 />
        </div>
      )}
    </div>
  );
};
export default Index;
