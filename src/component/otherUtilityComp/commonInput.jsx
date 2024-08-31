import React, { forwardRef, memo } from "react";

const CommonInput = forwardRef(function CommonInput(
  { className, type, name, labelname, isLoading, ...props },
  ref
) {
  return (
    <div className={className}>
      <label htmlFor={name} className=" w-full">
        {labelname}
      </label>
      <input
        ref={ref}
        type={type}
        id={name}
        name={name}
        className={`p-3 border border-black outline-none  bg-gray-200 rounded-lg `}
        placeholder={name}
        disabled={isLoading}
        {...props}
      />
    </div>
  );
});

export default memo(CommonInput);
