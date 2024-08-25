import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profileIcon from "/ProfOutlook.png";
import userApi from "../Apis/userApi";
import { useMutation } from "react-query";
import Follow from "./buttons/follow";
import userImageSrc from "../utils/userImageSrc";
import { motion } from "framer-motion";
function PeoplesList({ people, index, className }) {
  const [isUserhover, setuserHower] = useState(false);
  const userRef = useRef();
  const { userImageurl, IsuserFromOAth } = userImageSrc(people);
  return (
    <li
      className={`flex mt-2 justify-between px-2 w-full  gap-3 font-medium capitalize items-center   ${className}`}
      key={people?.id}
      id={people?.id}
    >
      <Link
        className="flex gap-2 justify-between"
        to={`/profile/@${people?.username.split(" ").join("")}/${people?.id}`}
      >
        <img
          className="h-[30px] rounded-full w-[30px] object-cover object-top"
          src={userImageurl}
          alt={`${people?.username}'s profile picture`}
        />
        <div
          onMouseOver={() => setuserHower(true)}
          onMouseOut={() => setuserHower(false)}
          className=" flex ms-3 gap-2  justify-center overflow-hidden flex-col items-start"
        >
          <h1 className="">{people?.username}</h1>
          {isUserhover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              key={people.id}
              className=" absolute w-auto flex flex-col gap-2 border  mt-[90px] bg-white font-normal text-[12px] p-3 overflow-hidden overflow-ellipsis rounded-md "
            >
              <div className=" flex gap-4 justify-start items-center font-medium ">
                {" "}
                <img
                  className="h-[1.5rem] rounded-full w-[1.5rem] object-cover object-top"
                  src={
                    people?.userImage
                      ? `${import.meta.env.VITE_BASE_URL}/${people?.userImage}`
                      : profileIcon
                  }
                  alt={`${people?.username}'s profile picture`}
                />
                <h1 className=" text-sm">{people?.username}</h1>
              </div>

              <p>{people?.userInfo}</p>
            </motion.div>
          )}
        </div>
      </Link>
      <Follow
        People={people}
        className={
          "w-[85px] h-7 font-light bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-full"
        }
      />
    </li>
  );
}

export default memo(PeoplesList);
