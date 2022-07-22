import { useEffect, useState } from "react";
import styled from "styled-components";
import deleteProductById from "../../../api/deleteProductByIdAPI";
import getAllCategoryForProduct from "../../../api/getAllCategoryForProduct";
import getAllProductList from "../../../api/getAllProduct";
import getProductByCategory from "../../../api/getProductByCategory";
import PopupDelete from "../../../until/PopupDelete";
import AddProductPopup from "./addProductPopup";
import { toast, ToastContainer } from "react-toastify";
import searchProductByName from "../../../api/searchProductByNameAPI";
import EditProductPopup from "./editProductPopup";
const BarsContainer = styled.div`
  :hover {
    border-bottom: 3px solid #eb6e15 !important;
    & > .customer_bars {
      font-weight: bold;
      color: #eb6e15 !important;
    }
  }
`;
const ListProduct = () => {
  const threads = [
    { key: "couponId", name: "Mã sản phẩm" },
    { key: "manuId", name: "Tên sản phẩm" },
    { key: "image", name: "Hình ảnh" },
    { key: "price", name: "Giá" },
    { key: "priceSale", name: "Giá sale" },
    { key: "manufacture", name: "Thương thiệu" },
    { key: "category", name: "Loại sản phẩm" },
    { key: "creator", name: "Người tạo" },
    { key: "quantity", name: "Số lượng" },
  ];
  //state data
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);
  const [productId, setProductId] = useState();
  const [productIdEdit, setProductIdEdit] = useState();
  //state
  const [searchKey, setSearchKey] = useState();
  const [choseBar, setChoseBar] = useState(-1);
  //state modal
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [openPopupDelete, setOpenDeletePopup] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  //[handle open || close modal]
  //----modal delete ---
  const handleCloseDelete = () => setOpenDeletePopup(false);
  const handleOpenDelete = () => setOpenDeletePopup(true);
  //----modal add ---
  const handleClose = () => setOpen(false);
  //----modal edit ---
  const handleCloseEdit = () => setOpenEditProduct(false);
  //---reload page
  const handleReload = () => setReload(!reload);

  //page load
  useEffect(() => {
    const getAllProduct = async () => {
      await getAllProductList()
        .then((product) => {
          setProductList(product.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
    getAllProduct();
  }, [reload]);
  useEffect(() => {
    const getCategories = async () => {
      const result = await getAllCategoryForProduct();
      if (result.success) {
        setCategory(result.data);
      }
    };
    getCategories();
  }, [reload]);

  const handleSetChoseBar = async (id) => {
    setChoseBar(-1);
    setChoseBar(id);
    if (id === "1") {
      return setReload(!reload);
    } else {
      setProductList([]);
      let result = await getProductByCategory(id);
      setProductList(result.data);
    }
  };
  const handleOpenPopupDelete = (id) => {
    setProductId(id);
    handleOpenDelete();
  };
  const handleDeleteProductById = async () => {
    if (productId) {
      await deleteProductById(productId)
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
            setReload(!reload);
            handleCloseDelete();
          } else {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return;
    }
  };
  const handleSearch = async () => {
    if (searchKey) {
      await searchProductByName(searchKey)
        .then((data) => {
          setProductList(data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setReload(!reload);
    }
  };
  const handleUpdate = (id) => {
    setProductIdEdit(id);
    setOpenEditProduct(true);
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
          <div className="ml-4 px-16 bg-[#f3f4f6] text-xs flex items-center justify-center">
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
      <div className="flex">
        {category.map((bar) => (
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
                choseBar === bar.id
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
          <thead className="bg-[#f3f4f6] text-xs">
            <tr
              style={{
                borderTop: "1px solid #dee1e6",
                borderLeft: "1px solid #dee1e6",
                borderRight: "1px solid #dee1e6",
              }}
            >
              {threads.map((th) => (
                <th
                  className=" pl-4 py-4 items-center uppercase text-left text-[#9a9ea9]"
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
            {productList.length > 0 ? (
              productList?.map((tr) => (
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
                  <td className="px-8">
                    <img
                      className="w-[40px] h-[40px]"
                      src={tr?.image}
                      alt={tr?.name}
                    />
                  </td>
                  <td className="pl-8">{tr?.price}</td>
                  <td className="pl-8">{tr?.priceSale}</td>
                  <td className="pl-8">{tr?.manufacture.name}</td>
                  <td className="pl-8">{tr?.category.name}</td>
                  <td className="pl-8">{tr?.createBy.role.name}</td>
                  <td className="pl-8">{tr?.quantity}</td>
                  <td>
                    <div className="flex text-[#9095a1] text-xs px-2">
                      <div
                        onClick={() => handleUpdate(tr._id)}
                        className="cursor-pointer"
                      >
                        <i className="fas fa-edit"></i>
                      </div>
                      <div
                        onClick={() => handleOpenPopupDelete(tr._id)}
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
      <AddProductPopup
        open={open}
        handleClose={handleClose}
        handleReload={handleReload}
      />
      <PopupDelete
        open={openPopupDelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleDeleteProductById}
      >
        Bạn thật sự muốn xóa
      </PopupDelete>
      <EditProductPopup
        open={openEditProduct}
        handleClose={handleCloseEdit}
        handleReload={handleReload}
        productId={productIdEdit}
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
    </div>
  );
};

export default ListProduct;
