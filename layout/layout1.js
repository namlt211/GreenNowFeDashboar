import { useState } from "react";
import loginUser from "../api/loginAPI";
import Cookies from "js-cookie";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
const Layout1 = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (user.email === "" || user.password === "") {
      toast.error("Bạn chưa nhập thông tin đăng nhập !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        let result = await loginUser(user);
        if (
          result.success &&
          (result.data.role.name === "ADMIN" ||
            result.data.role.name === "STAFF")
        ) {
          setUserInfo(result.data);
          Cookies.set("user", result.token, { expires: 30 });
          let userJson = JSON.stringify(result.data);
          localStorage.setItem("user", userJson);
          dispatch(loginSuccess(result.data));
          Router.push("/");
        } else {
          toast.error("Bạn không có quyền truy cập trang này !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-column mt-[15%]">
        <div className="w-[300px]">
          <div className="flex justify-center text-3xl uppercase text-[#d46312] pb-5">
            Đăng nhập hệ thống
          </div>
          <div className="flex py-5 items-center flex-nowrap">
            <label className="text-2xl w-[100px] text-[#d46312]">Email:</label>
            <input
              className="w-full h-[30px] rounded-xl border border-solid pl-3 border-[#ccc]"
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="flex py-5 items-center">
            <label className="text-2xl w-[100px] text-[#d46312]">
              Password:
            </label>
            <input
              className="w-full h-[30px] rounded-xl border border-solid pl-3 border-[#ccc]"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="flex py-5 justify-center">
            <button
              className="text-white border border-solid border-[#ccc] p-4 rounded-2xl text-2xl bg-[#d46312]"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Layout1;
