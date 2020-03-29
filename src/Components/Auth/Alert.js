import React from "react";

const Alert = ({ text, type }) => {
  return <div className={type}>{text}</div>;
};

export default Alert;
