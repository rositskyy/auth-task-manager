import React, { PureComponent } from "react";
import Tasks from "./Tasks/Tasks";
import { Redirect } from "react-router-dom";

class Profile extends PureComponent {
  render() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return (
      <>
        <div className="container">
          <h4 style={{ textAlign: "center", color: "grey" }}>
            Welcome home {currentUser && currentUser.user}!
          </h4>{" "}
          <Tasks />
        </div>
        {!currentUser && <Redirect to="/login" />}
      </>
    );
  }
}

export default Profile;
