import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import deleteManufactureById from "../../../api/deleteManufactureByIdAPI";
import findManufactureByName from "../../../api/findManufactureByNameAPI";
import getAllStatusManufacture from "../../../api/getAllStatusManufactureAPI";
import getManufactureByStatusIdApi from "../../../api/getManufactureByStatusIdAPI";
import getSupplier from "../../../api/getSupplierAPI";
import PopupDelete from "../../../until/PopupDelete";
import PopupAddSupplier from "./addSupplierPopup";
import PopupEditSupplier from "./editSupplierPopup";
const BarsContainer = styled.div`
  :hover {
    border-bottom: 3px solid #eb6e15 !important;
    & > .customer_bars {
      font-weight: bold;
      color: #eb6e15 !important;
    }
  }
`;
const statusOfData = [
  { id: 1, value: "Mới", color: "bg-[#9095a1]" },
  { id: 2, value: "Thân thuộc", color: "bg-[#ed7d2d]" },
  { id: 3, value: "Lâu năm", color: "bg-[#18ec5f]" },
  { id: 4, value: "Đối tác chiến lược", color: "bg-[#f22121]" },
];
const threads = [
  { key: "couponId", name: "Mã " },
  { key: "manuId", name: "Tên thương hiệu" },
  { key: "address", name: "Địa chỉ" },
  { key: "phone", name: "Điện thoại" },
  { key: "creator", name: "Người tạo" },
  { key: "update", name: "Cập nhật" },
  { key: "note", name: "Giới thiệu" },
  { key: "status", name: "Trạng thái" },
];
const SupplierContainer = () => {
  //---state
  const [supplier, setSupplier] = useState([]);
  const [filterBars, setFilterBars] = useState([]);
  const [manufactureId, setManufactureId] = useState();
  const [search, setSearch] = useState("");
  //---modal state ---
  const [openPopupAdd, setOpenPopupAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  //---reload page
  const [reload, setReload] = useState(false);
  //---handle modal ---
  const handleReload = () => setReload(!reload);
  const handleCloseDeletePopup = () => setOpenDelete(false);
  const handleCloseAddModal = () => setOpenPopupAdd(false);
  const handleCloseUpdatePopup = () => setOpenUpdate(false);
  useEffect(() => {
    const getAllManufacture = async () => {
      await getSupplier()
        .then((supplier) => {
          setSupplier(supplier.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getAllManufacture();
  }, [reload]);
  useEffect(() => {
    const getAllFilters = async () => {
      await getAllStatusManufacture()
        .then((status) => {
          setFilterBars(status.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
    getAllFilters();
  }, [reload]);

  const [choseBar, setChoseBar] = useState(-1);
  const handleSetChoseBar = async (id) => {
    setChoseBar(-1);
    setChoseBar(id);
    if (id === "1") {
      setReload(!reload);
    } else {
      await getManufactureByStatusIdApi(id)
        .then((manufacture) => {
          setSupplier(manufacture.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };
  const handleOpenAdd = () => setOpenPopupAdd(true);
  const handleOpenDeletePopup = (id) => {
    setManufactureId(id);
    setOpenDelete(true);
  };
  const deleteManufacture = async () => {
    if (manufactureId) {
      await deleteManufactureById(manufactureId)
        .then((data) => {
          if (data.success) {
            toast.success(data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            handleReload();
            handleCloseDeletePopup();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      return;
    }
  };
  const handleOpenUpdatePopup = (id) => {
    setManufactureId(id);
    setOpenUpdate(true);
  };
  const handleSearchClick = async () => {
    if (search) {
      await findManufactureByName(search)
        .then((result) => {
          setSupplier(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      handleReload();
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="p-2 text-[#424856] text-xs border-solid border border-[#424856]">
            <i className="fas fa-search pl-2"></i>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="pl-3 focus:outline-none"
              placeholder="Tìm kiếm ..."
            />
          </div>
          <div
            onClick={handleSearchClick}
            className="ml-4 text-xs p-2 px-16 bg-[#f3f4f6] flex items-center justify-center cursor-pointer"
          >
            <button className="mr-4 rounded border border-solid  border-[#f3f4f6]">
              Lọc
            </button>
            <i className="fas fa-filter"></i>
          </div>
        </div>
        <div className="flex">
          <div className="ml-4 px-16 bg-[#f3f4f6] text-xs flex items-center justify-center">
            <button className="mr-4 rounded border border-solid border-[#f3f4f6]">
              Thao tác
            </button>
            <i className="fas fa-angle-down"></i>
          </div>
          <div
            onClick={handleOpenAdd}
            className="ml-4 p-2 px-16 bg-[#ed7d2d] text-xs text-white flex items-center justify-center cursor-pointer"
          >
            <i className="far fa-plus  font-bold"></i>
            <button className="ml-4 rounded border border-solid border-[#ed7d2d]">
              Thêm mới
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        {filterBars.map((bar) => (
          <BarsContainer
            style={
              choseBar === bar._id
                ? {
                    borderBottom: "3px solid #eb6e15",
                  }
                : { borderBottom: "none" }
            }
            key={bar._id}
            className={`flex pl-10 pt-10 pr-10 text-sm items-center pb-3 cursor-pointer`}
            onClick={() => handleSetChoseBar(bar._id)}
          >
            <div
              style={
                choseBar === bar._id
                  ? {
                      color: "#eb6e15",
                      fontWeight: "bold",
                    }
                  : { color: "#424856" }
              }
              className={`text-[#424856] px-2 customer_bars`}
            >
              {bar.name}
            </div>
            <div
              className={`rounded-full flex justify-center text-[#424856] min-w-[20px] h-[20px] bg-[#dee1e6] items-center p-2`}
            >
              {bar.sum > 99 ? `99+` : bar.sum}
            </div>
          </BarsContainer>
        ))}
      </div>
      <div>
        <table className="w-full">
          <thead className="bg-[#f3f4f6]">
            <tr
              style={{
                borderTop: "1px solid #dee1e6",
                borderLeft: "1px solid #dee1e6",
                borderRight: "1px solid #dee1e6",
              }}
            >
              {threads.map((th) => (
                <th
                  className={`${
                    th.key === "couponId" ? "pl-4" : ""
                  } text-xs py-4 items-center uppercase text-left text-[#9a9ea9]`}
                  key={th.key}
                >
                  <div className="flex items-center">
                    {th.key === "couponId" ? (
                      <input type="checkbox" className="accent-[#d46312]" />
                    ) : (
                      ""
                    )}
                    <div className="pl-4">{th.name}</div>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {supplier.length > 0 ? (
              supplier?.map((tr) => (
                <tr
                  key={tr?._id}
                  style={{
                    borderBottom: "1px solid #dee1e6",
                    borderLeft: "1px solid #dee1e6",
                    borderRight: "1px solid #dee1e6",
                  }}
                >
                  <td className="uppercase flex items-center py-8">
                    <div className="flex items-center pl-4">
                      <input type="checkbox" className="accent-[#d46312]" />
                      <div className="pl-4">{tr?._id}</div>
                    </div>
                  </td>
                  <td className="uppercase pl-4">{tr?.name}</td>
                  <td className="px-4">
                    <div>{tr?.address}</div>
                  </td>
                  <td className="pl-4">{tr?.phone}</td>
                  <td className="pl-4">
                    <div>{tr?.createBy?.role?.name}</div>
                  </td>
                  <td className="pl-4">{tr?.updateAt}</td>
                  <td className="pl-4 truncate w-[20px]">{tr?.description}</td>
                  <td className="pl-4">
                    <span
                      className={`py-1 px-1 text-[10px] text-white ${
                        statusOfData.find(
                          (status) => tr.status.name === status.value
                        ).color
                      }`}
                    >
                      {tr.status.name}
                    </span>
                  </td>
                  <td>
                    <div className="flex text-[#9095a1] text-xs px-2">
                      <div
                        onClick={() => handleOpenUpdatePopup(tr._id)}
                        className="cursor-pointer"
                      >
                        <i className="fas fa-edit"></i>
                      </div>
                      <div
                        onClick={() => handleOpenDeletePopup(tr._id)}
                        className="ml-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={threads.length}>
                  <div className="flex justify-center text-5xl items-center text-[#ccc] pt-20">
                    Không có dữ liệu
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PopupAddSupplier
        open={openPopupAdd}
        handleClose={handleCloseAddModal}
        handleReload={handleReload}
      />
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
        className="text-xs font-roboto"
      />
      <PopupEditSupplier
        open={openUpdate}
        handleClose={handleCloseUpdatePopup}
        manufactureId={manufactureId}
        handleReload={handleReload}
      />
      <PopupDelete
        open={openDelete}
        handleClose={handleCloseDeletePopup}
        handleConfirm={deleteManufacture}
      >
        Bạn thật sự muốn xóa !
      </PopupDelete>
    </div>
  );
};

export default SupplierContainer;
