import React from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function OAuth() {
  const handelGoogleAuth = () => {
    // Redirecting the browser to the Google OAuth endpoint
    window.location.href = `${BASE_URL}/auth/login/google`;
  };

  return (
    <button
      type="button"
      onClick={handelGoogleAuth}
      className="bg-gray-200 min-w-[200px] flex items-center p-3 w-full justify-between rounded-lg"
    >
      <i className="bi bi-google"></i>
      <span className="w-full text-xs sm:text-inherit text-center">
        Continue with Google
      </span>
    </button>
  );
}

export default OAuth;
