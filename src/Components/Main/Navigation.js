import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../store/actions/userAction";

const Navigation = ({ userLogout, loginStatus }) => {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo center">
            task-manager-app
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
                <Link to="/profile" onClick={userLogout}>
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

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, { userLogout })(Navigation);
