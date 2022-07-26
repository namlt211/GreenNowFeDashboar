import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import addManufacture from "../../../api/addManufacture";
import getAllStatus from "../../../api/getAllStatus";
import Popup from "../../../until/Popup";

const PopupAddSupplier = (props) => {
  const { open, handleClose, handleReload } = props;
  const [status, setStatus] = useState([]);
  const [manufacture, setManufacture] = useState({
    name: "",
    address: "",
    phone: "",
    image: "",
    description: "",
    status: "",
  });
  useEffect(() => {
    const getStatus = async () => {
      await getAllStatus()
        .then((status) => {
          if (status.success) {
            setStatus(status.data);
          } else {
            return setStatus([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getStatus();
  }, []);
  const handleUpdateManufacture = async () => {
    await addManufacture(manufacture)
      .then((data) => {
        if (data.success) {
          setManufacture({
            name: "",
            address: "",
            phone: "",
            image: "",
            description: "",
            status: "",
          });
          toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });

          handleClose();
          handleReload();
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
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      title="Thêm nhà cung cấp"
      titleBtn="Thêm nhà cung cấp"
      size=""
      handleConfirm={handleUpdateManufacture}
    >
      <div className="flex flex-col text-sm mt-3">
        <div className="flex flex-col">
          <label>Tên nhà cung cấp: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, name: e.target.value })
            }
            type="text"
            className="outline-none border border-solid p-1 mt-1"
            value={manufacture.name}
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>Địa chỉ: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, address: e.target.value })
            }
            type="text"
            value={manufacture.address}
            className="outline-none border border-solid p-1 mt-1"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>Số điện thoại: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, phone: e.target.value })
            }
            type="text"
            value={manufacture.phone}
            className="outline-none border border-solid p-1 mt-1"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>Hình ảnh: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, image: e.target.value })
            }
            type="text"
            value={manufacture.image}
            className="outline-none border border-solid p-1 mt-1"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>Trạng thái: </label>
          <select
            onChange={(e) =>
              setManufacture({ ...manufacture, status: e.target.value })
            }
            value={manufacture.status || ""}
            className="outline-none border border-solid p-1 mt-1"
          >
            <option value="">Trạng thái</option>
            {status?.map((status) => (
              <option key={status?._id} value={status?._id}>
                {status?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex flex-col">
          <label>Mô tả: </label>
          <textarea
            onChange={(e) =>
              setManufacture({ ...manufacture, description: e.target.value })
            }
            value={manufacture.description || ""} 
            className="outline-none border border-solid p-1 my-1 min-h-[80px]"
            placeholder="Mô tả chi tiết"
          ></textarea>
        </div>
      </div>
    </Popup>
  );
};

export default PopupAddSupplier;
