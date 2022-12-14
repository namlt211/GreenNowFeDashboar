import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAllCategories from "../../../api/getAllCategoryForProduct";
import getProductById from "../../../api/getProductById";
import getSupplier from "../../../api/getSupplierAPI";
import updateProductById from "../../../api/updateProductById";
import Popup from "../../../until/Popup";
const EditProductPopup = (props) => {
  const { open, handleClose, handleReload, productId } = props;
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
    const getProduct = async () => {
      if (productId) {
        await getProductById(productId)
          .then((product) => {
            setProduct(product.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        return;
      }
    };
    getProduct();
  }, [productId]);
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
  const handleUpdateProduct = async () => {
    let result = await updateProductById(productId, product);
    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
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
      title="C???p nh???t s???n ph???m"
      handleConfirm={handleUpdateProduct}
      titleBtn="C???p nh???t"
    >
      <div>
        <div className="mt-3">
          <div className="flex">
            <div className="flex flex-col w-1/2 p-1 text-sm">
              <label>T??n s???n ph???m: </label>
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                type="text"
                placeholder="T??n s???n ph???m..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="mt-2">H??nh ???nh: </label>
              <input
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
                type="text"
                placeholder="H??nh ???nh"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />

              <label className="mt-2">S??? l?????ng: </label>
              <input
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
                type="number"
                placeholder="S??? l?????ng"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
            </div>
            <div className="flex flex-col w-1/2 text-sm p-1">
              <label>Nh?? cung c???p: </label>
              <select
                value={product.manufacture._id}
                onChange={(e) =>
                  setProduct({ ...product, manufacture: e.target.value })
                }
                className="border mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
              >
                <option value="">Ch???n nh?? cung c???p</option>
                {supplier?.data?.map((sup, index) => (
                  <option key={index} value={sup._id}>
                    {sup.name}
                  </option>
                ))}
              </select>
              <label className="mt-2">Lo???i s???n ph???m: </label>
              <select
                value={product.category._id}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize  w-full"
              >
                <option value="">Ch???n lo???i s???n ph???m</option>
                {category?.map((sup, index) => (
                  <option key={index} value={sup._id}>
                    {sup.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label className="mt-2">Gi??: </label>
                  <input
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    type="number"
                    placeholder="Gi??"
                    className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-2">Gi???m gi??: </label>
                  <input
                    value={product.priceSale}
                    onChange={(e) =>
                      setProduct({ ...product, priceSale: e.target.value })
                    }
                    type="number"
                    placeholder="Gi???m gi??"
                    className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 text-sm p-1 flex flex-col">
            <label className="">M?? t??? s???n ph???m</label>
            <textarea
              className="outline-none mt-2 p-2 min-h-[200px] border border-solid"
              value={product.description}
              onChange={(text) => setProduct({ ...product, description: text })}
              placeholder="M?? t??? s???n ph???m"
            ></textarea>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default EditProductPopup;
