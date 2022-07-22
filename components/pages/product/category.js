import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import deleteCategoryAPI from "../../../api/deleteCategoryAPI";
import getAllCategories from "../../../api/getAllCategory";
import searchCategory from "../../../api/searchCategoryByKeyAPI";
import PopupDelete from "../../../until/PopupDelete";
import AddCategoryPopup from "./addCategoryPopup";
import EditCategoryPopup from "./editCategoryPopup";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(true);
  const [popup, setPopup] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [searchKey, setSearchKey] = useState();
  const handleCloseEdit = () => setOpenEdit(false);
  const handleClosePopup = () => setPopup(false);
  const handleClose = () => setOpen(false);
  const handleReload = () => setReload(!reload);
  useEffect(() => {
    const getAllCategory = async () => {
      const result = await getAllCategories();
      if (result.success) {
        setCategoryList(result.data);
      } else {
        console.log("error");
      }
    };
    getAllCategory();
  }, [reload]);
  let threads = [
    { key: "id", name: "Mã " },
    { key: "name", name: "Tên danh mục" },
    { key: "createBy", name: "Người tạo" },
    { key: "description", name: "Mô tả" },
  ];
  const handleDelete = (id) => {
    setPopup(true);
    setDeleteId(id);
  };
  const handleDeleteCategory = async () => {
    let data = await deleteCategoryAPI(deleteId);
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
      handleClosePopup();
      setReload(!reload);
    }
  };
  const handleOpenEdit = (id) => {
    setCategoryId(id);
    setOpenEdit(true);
  };
  const handleSearch = async () => {
    if (searchKey) {
      await searchCategory(searchKey)
        .then((d) => {
          setCategoryList(d.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setReload(!reload);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="p-2 text-[#424856] text-xs border-solid border border-[#424856]">
            <i className="fas fa-search pl-2"></i>
            <input
              className="pl-3 focus:outline-none"
              placeholder="Tìm kiếm ..."
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
          <div
            onClick={handleSearch}
            className="ml-4 text-xs p-2 px-16 bg-[#f3f4f6] flex items-center justify-center cursor-pointer"
          >
            <button className="mr-4 rounded border border-solid  border-[#f3f4f6]">
              Lọc
            </button>
            <i className="fas fa-filter"></i>
          </div>
        </div>
        <div className="flex">
          <div className="ml-4 px-16 bg-[#f3f4f6] text-xs flex items-center justify-center cursor-pointer">
            <button className="mr-4 rounded border border-solid border-[#f3f4f6]">
              Thao tác
            </button>
            <i className="fas fa-angle-down"></i>
          </div>
          <div
            onClick={() => setOpen(true)}
            className="ml-4 p-2 px-16 bg-[#ed7d2d] text-xs text-white flex items-center justify-center cursor-pointer"
          >
            <i className="far fa-plus  font-bold"></i>
            <button className="ml-4 rounded border border-solid border-[#ed7d2d]">
              Thêm mới
            </button>
          </div>
        </div>
      </div>
      <div className="flex"></div>
      <div className="py-10">
        <table className="w-full ">
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
                  className="text-xs pl-4 py-4 items-center uppercase text-left text-[#9a9ea9]"
                  key={th.key}
                >
                  <div className="flex items-center">
                    {th.key === "id" ? (
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
            {categoryList?.length > 0 ? (
              categoryList?.map((tr) => (
                <tr
                  key={tr._id}
                  style={{
                    borderBottom: "1px solid #dee1e6",
                    borderLeft: "1px solid #dee1e6",
                    borderRight: "1px solid #dee1e6",
                  }}
                >
                  <td className="uppercase flex items-center py-8">
                    <div className="flex items-center pl-4">
                      <input type="checkbox" className="accent-[#d46312]" />
                      <div className="pl-4">{tr._id}</div>
                    </div>
                  </td>
                  <td className="uppercase pl-8 ">
                    <div className="w-[150px] truncate text-ellipsis overflow-hidden">
                      {tr.name}
                    </div>
                  </td>
                  <td className="px-8">{tr.createBy.role.name}</td>
                  <td className="px-8">{tr.description}</td>
                  <td>
                    <div className="flex text-[#9095a1] text-xs px-2">
                      <div
                        onClick={() => handleOpenEdit(tr._id)}
                        className="cursor-pointer"
                      >
                        <i className="fas fa-edit"></i>
                      </div>
                      <div
                        onClick={() => handleDelete(tr._id)}
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
      <AddCategoryPopup
        open={open}
        handleClose={handleClose}
        handleReload={handleReload}
      />
      <EditCategoryPopup
        open={openEdit}
        handleClose={handleCloseEdit}
        id={categoryId}
        handleReload={handleReload}
      />
      <PopupDelete
        open={popup}
        handleClose={handleClosePopup}
        handleConfirm={handleDeleteCategory}
      >
        <div>
          <div className="text-sm my-5 text-center">
            Bạn có thực sự muốn xóa !
          </div>
        </div>
      </PopupDelete>
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
    </div>
  );
};

export default Categories;
