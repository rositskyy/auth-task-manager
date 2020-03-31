import React from "react";

const IconButton = ({ onClick, label, styleClass }) => {
  return (
    <i onClick={onClick} className={`material-icons ${styleClass}`}>
      {label}
    </i>
  );
};

export default IconButton;
