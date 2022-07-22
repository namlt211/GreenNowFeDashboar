import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logoutAPI from "../../api/logoutAPI";
import Router from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice";
const Navbar = (props) => {
  const { navMenu, handleOpenCloseSideBar } = props;
  const userSelector = useSelector((state) => state.user.login.data);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userSelector !== null) {
      setUser(userSelector);
    } else {
      let userObject = JSON.parse(localStorage.getItem("user"));
      setUser(userObject);
    }
  }, []);
  const handleLogout = async () => {
    let token = { token: user.refreshToken };
    let result = await logoutAPI(token);
    if (result.success) {
      Cookies.remove("user");
      dispatch(logout());
      Router.push("/");
    }
  };
  return (
    <div className="shadow-md w-full flex justify-between px-5 py-2 items-center">
      {navMenu.length > 0 ? (
        navMenu.map((nav, i) => (
          <div key={i} className="flex text-xs">
            <div className="ml-3 cursor-pointer">
              <i
                onClick={() => handleOpenCloseSideBar()}
                className="fa-solid fa-bars cursor-pointer text-sm"
              ></i>
            </div>
            <div className={`ml-4 ${nav.child ? "" : "font-bold"}`}>
              {nav.parent}
            </div>
            <span className="px-2">/</span>
            <div className="font-bold">{nav.child}</div>
          </div>
        ))
      ) : (
        <div className="ml-3 text-sm">
          <i
            onClick={() => handleOpenCloseSideBar()}
            className="fa-solid fa-bars cursor-pointer"
          ></i>
        </div>
      )}

      <div className="flex text-sm items-center">
        <div className="mr-7">
          <i className="fa-solid fa-question cursor-pointer"></i>
        </div>
        <div className="mr-7">
          <i className="fa-solid fa-bell cursor-pointer"></i>
        </div>
        <div className="relative">
          <img
            className="rounded-full mr-7 cursor-pointer"
            src={user?.image ? user.image : "/avatar.jpg"}
            width={40}
            height={40}
            onClick={() => setOpen(!open)}
            alt="user"
          />
          <div
            className={`bg-white text-xs absolute w-[120px] h-[100px] right-0 top-[50px] border border-solid border-[#ccc] rounded-2xl p-4 flex flex-col justify-center ${
              open ? "block" : "hidden"
            }`}
          >
            <div className="pb-5 cursor-pointer hover:text-[#d46312]">
              Thông tin
            </div>
            <div
              onClick={handleLogout}
              className="cursor-pointer hover:text-[#d46312]"
            >
              Đăng xuất
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
