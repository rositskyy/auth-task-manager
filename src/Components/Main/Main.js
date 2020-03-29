import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Main = ({ loginStatus }) => {
  return (
    <>
      {loginStatus ? (
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

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, null)(Main);
