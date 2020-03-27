import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const isLogged = localStorage.getItem("logged");
  return (
    <>
      {isLogged ? (
        <Link to="/profile">
          <h1 style={{ color: "grey", textAlign: "center" }}>
            open task manager
          </h1>
        </Link>
      ) : (
        <Link to="/login">
          <h1 style={{ color: "grey", textAlign: "center" }}>
            Log In to see your profile!
          </h1>
        </Link>
      )}
    </>
  );
};

export default Main;
