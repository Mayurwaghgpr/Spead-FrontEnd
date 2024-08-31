import React from "react";

function Spiner({ className }) {
  return (
    <div className={`loader  ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spiner;
