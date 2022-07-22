import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/pages/Navbar";
import SideBar from "../components/pages/SideBar";
const Container = styled.div``;
const Layout = (props) => {
  const { children } = props;
  const [menus, setMenus] = useState([
    {
      key: 2,
      name: "Quản lý đơn hàng",
      link: "/",
      icon: "",
      open: true,
      children: [
        {
          key: 1,
          name: "Danh sách đơn hàng",
          link: "/order/orderList",
          icon: "fa-solid fa-file-import",
        },

        {
          key: 3,
          name: "Đơn hàng trong ngày",
          link: "/",
          icon: "fa-solid fa-calendar-days",
        },
        { key: 4, name: "Thống kê", link: "/", icon: "fa-solid fa-bars" },
      ],
    },
    {
      key: 1,
      name: "Quản lý sản phẩm",
      link: "/category",
      open: true,
      children: [
        {
          key: 1,
          name: "Danh mục sản phẩm",
          link: "/product/category",
          icon: "fa-solid fa-bars",
        },
        {
          key: 2,
          name: "Danh sách sản phẩm",
          link: "/product/productList",
          icon: "fa-solid fa-bars",
        },
        {
          key: 3,
          name: "Nhà cung cấp",
          link: "/supplier",
          icon: "fa-solid fa-bars",
        },
      ],
    },

    {
      key: 3,
      name: "Tùy chỉnh",
      link: "/setting",
      open: true,
      children: [
        { key: 1, name: "Nhân viên", link: "/", icon: "fa-solid fa-user" },
        {
          key: 2,
          name: "Phân quyền",
          link: "/",
          icon: "fa-solid fa-up-down-left-right",
        },
        {
          key: 3,
          name: "Cài đặt hệ thống",
          link: "/",
          icon: "fa-solid fa-gear",
        },
      ],
    },
  ]);
  const [navMenu, setNavMenu] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(true);
  const handleNavLink = (obj, child) => {
    let newNav = { parent: obj.name, child: child.name };

    setNavMenu([newNav]);
  };
  const handleOpenCloseMenu = (i) => {
    let newArr = [...menus];
    newArr[i].open = !newArr[i].open;
    setMenus(newArr);
  };
  const handleOpenCloseSideBar = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <Container className="flex">
      <SideBar
        menus={menus}
        handleOpenCloseMenu={handleOpenCloseMenu}
        handleNavLink={handleNavLink}
        openSideBar={openSideBar}
      />
      <div className="flex flex-col w-full">
        <Navbar
          navMenu={navMenu}
          handleOpenCloseSideBar={handleOpenCloseSideBar}
        />
        <div className="p-10 bg-white min-h-screen">{children}</div>
      </div>
    </Container>
  );
};

export default Layout;
