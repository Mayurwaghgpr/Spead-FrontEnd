import React, { memo } from "react";

const SomthingWentWrong = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      {" "}
      <h1>..oops! somthingWentWrong</h1>
    </div>
  );
};

export default memo(SomthingWentWrong);
