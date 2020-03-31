import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogOut } from "../../store/actions/userAction";

const Navigation = ({ userLogOut, loginStatus }) => {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            task-manager
          </Link>
          <ul id="nav-mobile" className="right">
            {loginStatus && (
              <li>
                <Link to="/profile">Profile</Link>{" "}
              </li>
            )}
            {!loginStatus && (
              <li>
                <Link to="/register">Registration</Link>{" "}
              </li>
            )}
            {loginStatus ? (
              <li>
                <Link to="/profile" onClick={userLogOut}>
                  Logout
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

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, { userLogOut })(Navigation);
