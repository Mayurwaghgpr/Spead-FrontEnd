import React, { memo } from "react";

function ProfilImage({ imageUrl, className = "", alt, title, ...props }) {
  return (
    <img
      className={`${className} `}
      src={imageUrl}
      alt={alt}
      title={title}
      {...props}
    />
  );
}

export default memo(ProfilImage);
