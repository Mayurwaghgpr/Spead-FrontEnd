import React from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function OAuth() {
  const handelGoogleAuth = () => {
    window.location.href = `${BASE_URL}/auth/login/google`;
  };

  return (
    <button
      type="button"
      onClick={handelGoogleAuth}
      className="bg-gray-200  flex items-center p-3 w-full justify-center gap-5 rounded-lg  border-inherit border"
    >
      <i className="bi bi-google"></i>
      <span className="">Continue with Google</span>
    </button>
  );
}

export default OAuth;
