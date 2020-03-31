import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TasksList from "./Tasks/TasksList";

const Profile = ({ currentUser, loginStatus }) => {
  return (
    <>
      <div className="container">
        <h4 style={{ textAlign: "center", color: "grey" }}>
          Welcome home{" "}
          <span style={{ color: "lightcoral" }}>{currentUser.login}</span>!
        </h4>
        <TasksList />
      </div>
      {!loginStatus && <Redirect to="/login" />}
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, null)(Profile);
