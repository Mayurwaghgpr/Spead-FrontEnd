import React, { memo } from "react";

function CommonInput({
  className,
  type,
  name,
  labelname,
  isLoading,
  ...props
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className=" w-full">
        {labelname}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`p-3 focus:shadow-inner outline-none focus:shadow-slate-900 bg-gray-200 rounded-lg `}
        placeholder={name}
        disabled={isLoading}
        {...props}
      />
    </div>
  );
}

export default memo(CommonInput);
