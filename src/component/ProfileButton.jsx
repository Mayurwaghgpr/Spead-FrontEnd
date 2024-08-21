import React, { memo } from "react";
import { useSelector } from "react-redux";

const ProfileButton = ({
  profileIcon,
  isMenuOpen,
  setIsMenuOpen,
  className,
}) => {
  const { isLogin, user } = useSelector((state) => state.auth);
  return (
    <button
      onClick={() => setIsMenuOpen((prev) => !prev)}
      type="button"
      className={` ${className} flex justify-center h-[40px] w-[40px] items-center  text-sm font-semibold text-gray-900 rounded-full`}
      id="menu-button"
    >
      <img
        className="cursor-pointer object-cover object-top rounded-full w-full  h-full"
        src={user?.userImage ? `${user?.userImage}` : profileIcon}
        title={user?.name}
        alt={user?.name}
      />
    </button>
  );
};

export default memo(ProfileButton);
