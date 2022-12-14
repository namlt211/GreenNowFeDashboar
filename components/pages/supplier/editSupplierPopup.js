import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAllStatus from "../../../api/getAllStatus";
import getManufactureById from "../../../api/getManufactureByIdAPI";
import updateManufactureById from "../../../api/updateManufactureByIdAPI";
import Popup from "../../../until/Popup";

const PopupEditSupplier = (props) => {
  const { open, handleClose, handleReload, manufactureId } = props;
  const [status, setStatus] = useState([]);
  const [manufacture, setManufacture] = useState({});
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
  useEffect(() => {
    const getManufacture = async () => {
      if (manufactureId) {
        await getManufactureById(manufactureId)
          .then((result) => {
            setManufacture(result.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        return;
      }
    };
    getManufacture();
  }, [manufactureId]);
  const handleUpdateManufacture = async () => {
    await updateManufactureById(manufactureId, manufacture)
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
      title="C???p nh???t nh?? cung c???p"
      titleBtn="C???p nh???t"
      size=""
      handleConfirm={handleUpdateManufacture}
    >
      <div className="flex flex-col text-sm mt-3">
        <div className="flex flex-col">
          <label>T??n nh?? cung c???p: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, name: e.target.value })
            }
            value={manufacture.name || ""}
            type="text"
            className="outline-none border border-solid p-1 mt-1"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>?????a ch???: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, address: e.target.value })
            }
            value={manufacture.address || ""}
            type="text"
            className="outline-none border border-solid p-1 mt-1"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>S??? ??i???n tho???i: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, phone: e.target.value })
            }
            value={manufacture.phone || ""}
            type="text"
            className="outline-none border border-solid p-1 mt-1"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>H??nh ???nh: </label>
          <input
            onChange={(e) =>
              setManufacture({ ...manufacture, image: e.target.value })
            }
            value={manufacture.image || ""}
            type="text"
            className="outline-none border border-solid p-1 mt-1"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label>Tr???ng th??i: </label>
          <select
            onChange={(e) =>
              setManufacture({ ...manufacture, status: e.target.value })
            }
            className="outline-none border border-solid p-1 mt-1"
            value={manufacture.status?._id}
          >
            {status?.map((status) => (
              <option key={status?._id} value={status?._id}>
                {status?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex flex-col">
          <label>M?? t???: </label>
          <textarea
            onChange={(e) =>
              setManufacture({ ...manufacture, description: e.target.value })
            }
            value={manufacture.description || ""}
            className="outline-none border border-solid p-1 my-1 min-h-[80px]"
            placeholder="M?? t??? chi ti???t"
          ></textarea>
        </div>
      </div>
    </Popup>
  );
};

export default PopupEditSupplier;
