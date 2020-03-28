import React from "react";
import Tasks from "./Tasks/TasksList";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <div className="container">
        <h4 style={{ textAlign: "center", color: "grey" }}>
          Welcome home <span style={{color: 'lightcoral'}}>{currentUser && currentUser.user}</span>!
        </h4>{" "}
        <Tasks />
      </div>
      {!currentUser && <Redirect to="/login" />}
    </>
  );
};

export default Profile;
