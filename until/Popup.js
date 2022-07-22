const Popup = ({
  children,
  open,
  size,
  handleClose,
  title,
  handleConfirm,
  titleBtn,
}) => {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed  inset-0 justify-center items-center bg-black bg-opacity-50`}
    >
      <div
        className={`bg-white p-6 h-auto ${
          size === "XL"
            ? "w-[1300px]"
            : size === "M"
            ? "w-[800px]"
            : "w-[400px]"
        } relative`}
      >
        <div className="flex justify-between text-xl">
          <div className="text-[#918d8d] uppercase">{title}</div>
          <span
            onClick={handleClose}
            className="cursor-pointer absolute right-4 top-2"
          >
            <i className="fa-solid fa-xmark text-[#918d8d]"></i>
          </span>
        </div>
        {children}
        <div className="mt-3 w-full flex justify-end">
          <button
            onClick={handleClose}
            className="border border-solid border-[#919191] mr-2 px-12 py-2 text-xs text-[#919191] hover:bg-[#919191] hover:text-white"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#d46312] text-white ml-2 py-2 px-3 border border-solid border-[#d46312]  text-sm hover:bg-[#f28639]"
          >
            {titleBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
