import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import addProductAPI from "../../../api/addProductAPI";
import getAllCategories from "../../../api/getAllCategoryForProduct";
import getSupplier from "../../../api/getSupplierAPI";
import Popup from "../../../until/Popup";
const AddProductPopup = (props) => {
  const { open, handleClose, handleReload } = props;
  const [supplier, setSupplier] = useState();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    manufacture: "",
    price: "",
    priceSale: "",
    category: "",
    description: "",
    quantity: 0,
  });
  useEffect(() => {
    const getAllSuppliers = async () => {
      let result = await getSupplier();
      if (result.success) {
        setSupplier(result);
      } else {
        toast.error(result.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    };
    getAllSuppliers();
  }, []);
  useEffect(() => {
    const getAllCategorie = async () => {
      let result = await getAllCategories();
      if (result.success) {
        result.data.splice(0, 1);
        setCategory(result.data);
      } else {
        toast.error(result.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    };
    getAllCategorie();
  }, []);
  const handleAddProductClick = async () => {
    let result = await addProductAPI(product);
    if (result.data.success) {
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setProduct({
        name: "",
        image: "",
        manufacture: "",
        price: "",
        priceSale: "",
        category: "",
        description: "",
        quantity: 0,
      });
      handleReload();
      handleClose();
    } else {
      toast.error(result.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      size="M"
      title="Thêm sản phẩm"
      handleConfirm={handleAddProductClick}
      titleBtn="Thêm sản phẩm"
    >
      <div>
        <div className="mt-3">
          <div className="flex">
            <div className="flex flex-col w-1/2 p-1 text-sm">
              <label>Tên sản phẩm: </label>
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                type="text"
                placeholder="Tên sản phẩm..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="mt-2">Hình ảnh: </label>
              <input
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
                type="text"
                placeholder="Hình ảnh"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />

              <label className="mt-2">Số lượng: </label>
              <input
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
                type="number"
                placeholder="Số lượng"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
            </div>
            <div className="flex flex-col w-1/2 text-sm p-1">
              <label>Nhà cung cấp: </label>
              <select
                value={product.manufacture}
                onChange={(e) =>
                  setProduct({ ...product, manufacture: e.target.value })
                }
                className="border mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
              >
                <option value="">Chọn nhà cung cấp</option>
                {supplier?.data?.map((sup, index) => (
                  <option key={index} value={sup._id}>
                    {sup.name}
                  </option>
                ))}
              </select>
              <label className="mt-2">Loại sản phẩm: </label>
              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize  w-full"
              >
                <option value="">Chọn loại sản phẩm</option>
                {category?.map((sup, index) => (
                  <option key={index} value={sup._id}>
                    {sup.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label className="mt-2">Giá: </label>
                  <input
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    type="number"
                    placeholder="Giá"
                    className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-2">Giảm giá: </label>
                  <input
                    value={product.priceSale}
                    onChange={(e) =>
                      setProduct({ ...product, priceSale: e.target.value })
                    }
                    type="number"
                    placeholder="Giảm giá"
                    className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 text-sm p-1 flex flex-col">
            <label className="">Mô tả sản phẩm</label>
            <textarea
              className="outline-none mt-2 p-2 min-h-[200px] border border-solid"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder="Mô tả sản phẩm"
            ></textarea>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AddProductPopup;
