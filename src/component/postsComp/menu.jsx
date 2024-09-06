import React, { useCallback, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmBox } from "../../redux/slices/uiSlice";
import { v4 as uuidv4 } from "uuid";
function Menu({ post }) {
  const menuRef = useRef();
  const dispatch = useDispatch();
  const { menuId, setMenuId } = useClickOutside(menuRef);
  const { user } = useSelector((state) => state.auth);
  const confirmDeletePost = useCallback(
    (id) => {
      dispatch(
        setConfirmBox({
          message: "Do you really want to delete the post?",
          status: true,
          type: "delete post",
        })
      );
      setPostIdToDelete(id);
      setMenuId("");
    },
    [dispatch]
  );
  const menuItem = [
    {
      id: uuidv4(),
      itemName: "Delete Post",
      icon: <i class="bi bi-trash2"></i>,
      itemMethod: () => confirmDeletePost(post?.id),
    },
    {
      id: uuidv4(),
      itemName: "Edite Post",
      icon: <i class="bi bi-vignette"></i>,
      itemMethod: () => confirmDeletePost(post?.id),
    },
  ];
  return (
    <div className="relative  flex justify-center w-full items-center">
      <span
        className="cursor-pointer"
        onClick={() => setMenuId((prev) => (prev === "" ? post?.id : ""))}
        type="button"
      >
        <i className="bi bi-three-dots-vertical  "></i>
      </span>
      {menuId === post?.id && (
        <ul
          ref={menuRef}
          className="absolute sm:top-5 mt-2 p-2 gap-2 flex flex-col  w-32  bg-white dark:bg-[#0f0f0f]  border before:content-normal before:absolute before:-top-[0.3rem] before:right-[3.6rem] before:h-[10px] before:w-[10px] before:rotate-45 before:bg-inherit before:border-l before:border-t border-gray-300 rounded-lg"
        >
          {menuItem.map((item, idx) => (
            <li className="w-full flex gap-2" onClick={item.itemMethod}>
              {item.icon}
              {item.itemName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;
