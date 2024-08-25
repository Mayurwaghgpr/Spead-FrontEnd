import React from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function OAuth({ service, icon, className }, { ...props }) {
  const handelGoogleAuth = () => {
    window.location.href = `${BASE_URL}/auth/login/${service}`;
  };

  return (
    <button
      type="button"
      onClick={handelGoogleAuth}
      className={`bg-gray-200  flex items-center p-3 w-full justify-center gap-5 rounded-lg  border-inherit border ${className}`}
      {...props}
    >
      {icon}

      <span className="">Continue with {service}</span>
    </button>
  );
}

export default OAuth;
