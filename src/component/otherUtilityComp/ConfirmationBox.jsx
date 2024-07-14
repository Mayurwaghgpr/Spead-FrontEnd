import { useDispatch, useSelector } from "react-redux";
import { setConfirmBox, setIsConfirm } from "../../redux/slices/uiSlice";

function ConfirmationBox() {
  const dispatch = useDispatch();
  const { confirmBox, isConfirm } = useSelector((state) => state.ui);

  const handleConfirm = () => {
    // Logic for confirming action
    dispatch(setIsConfirm({ type: confirmBox.type, status: true }));
    dispatch(setConfirmBox({ message: "", status: false }));
  };

  const handleCancel = () => {
    // Logic for cancelling action
    dispatch(setIsConfirm(false));
    dispatch(setConfirmBox({ message: "", status: false }));
  };
  // console.log(confirmBox);
  return (
    <div className="flex justify-center z-[60]  transition-transform delay-700 items-center fixed top-0 bottom-0 left-0 right-0  backdrop-blur-md ">
      <div className="p-3 flex flex-col justify-between inset-0 self-center justify-self-center fixed backdrop-blur-xl bg-sky-200 h-[200px] hover:border-double shadow-md sm:w-[400px] rounded-xl">
        <div className="text-lg flex justify-between">
          <h1>Confirmation</h1>
          <button
            className=" bg-inherit hover:shadow-xl bg-none "
            onClick={handleCancel}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className=" w-full">
          <p>{confirmBox?.message}</p>
        </div>
        <div className="flex justify-end gap-3 mb-0 w-full items-end ">
          <button
            onClick={handleCancel}
            name="cancel"
            className=" bg-white p-2 rounded-3xl"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            name="confirm"
            className="p-2 rounded-3xl bg-slate-400"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationBox;
