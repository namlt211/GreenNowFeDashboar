const PopupDelete = ({ children, open, handleClose, handleConfirm }) => {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed  inset-0 justify-center items-center bg-black bg-opacity-50`}
    >
      <div className={`bg-white p-6 h-auto w-[400px] relative`}>
        <div className="flex justify-between text-xl">
          <div className="flex justify-center w-full">
            <img className="w-[40px] " src="/icons/warn.png" />
          </div>
        </div>
        <div className="my-5 text-center">{children}</div>
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="border border-solid border-[#919191] mr-2 px-7 py-2 text-xs text-[#919191] hover:bg-[#919191] hover:text-white"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-7 py-2 border border-solid border-[#e30404] text-sm text-[#e30404] hover:text-white hover:bg-[#e30404]"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
