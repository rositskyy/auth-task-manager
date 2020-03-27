import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const isLogged = localStorage.getItem("logged");
  const logOut = () => {
    return window.confirm("You sure?")
      ? (localStorage.removeItem("logged"),
        localStorage.removeItem("currentUser"))
      : null;
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo center">
            task-manager-app
          </Link>
          <ul id="nav-mobile" className="right">
            {isLogged && (
              <li>
                <Link to="/profile">Profile</Link>{" "}
              </li>
            )}
            {!isLogged && (
              <li>
                <Link to="/register">Registration</Link>{" "}
              </li>
            )}
            {isLogged ? (
              <li>
                <Link to="/profile" onClick={() => logOut()}>
                  Log Out
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>{" "}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
