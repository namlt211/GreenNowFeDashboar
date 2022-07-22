import { useState } from "react";
import { toast } from "react-toastify";
import addCategory from "../../../api/addCategoryAPI";
import Popup from "../../../until/Popup";

const AddCategoryPopup = ({ open, handleClose, handleReload }) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const handleAddCategory = async () => {
    let data = await addCategory(category);
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
      setCategory({
        name: "",
        description: "",
      });
      handleReload();
      handleClose();
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
  };

  return (
    <Popup
      open={open}
      handleClose={handleClose}
      title="Thêm danh mục sản phẩm"
      titleBtn="Thêm danh mục"
      handleConfirm={handleAddCategory}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="mt-3 w-full">
          <label className="text-sm">Tên danh mục: </label>
          <input
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="mt-2 border border-solid border-[#ccc] p-2 text-xs w-full outline-none"
            type="text"
            value={category.name}
            placeholder="Tên danh mục"
          />
        </div>
        <div className="mt-3 w-full">
          <label className="text-sm py-5">Mô tả: </label>
          <textarea
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
            className="border border-solid border-[#ccc] mt-2 text-xs w-full p-2 outline-none min-h-[100px]"
            placeholder="Mô tả chi tiết"
            value={category.description}
          ></textarea>
        </div>
      </div>
    </Popup>
  );
};

export default AddCategoryPopup;
