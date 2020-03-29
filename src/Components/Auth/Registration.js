import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";
import { connect } from "react-redux";
import { userRegistration } from "../../store/actions/userAction";
import { Link } from "react-router-dom";

const Registration = ({ loginStatus, userRegistration }) => {

  const [alertWarn, setAlertWarn] = useState(false);

  const [alertSuccesful, setAlertSuccesful] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setAlertWarn(false), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alertWarn]);

  const onSubmitRegister = ({ login, password }) => {
    const registerResult = userRegistration({ login, password });
    if (registerResult) {
      setAlertSuccesful(true);
    } else {
      setAlertWarn(true);
    }
  };
  return (
    <>
      <div className="row container">
        {alertWarn && (
          <div className="col s12">
            <Alert
              type="alert_warn"
              text="Username is already exists, try another name"
            />
          </div>
        )}
        <h5 style={{ textAlign: "center", color: "grey" }}>Registration</h5>
        <AuthForm onSubmit={onSubmitRegister} />
        {alertSuccesful && (
          <div className="col s12 alert_succesful">
            <Alert
              text="Account created succesful!"
            />
            <Link to="/login" style={{textAlign: 'center'}}>Log In!</Link>
          </div>
        )}
      </div>
      {loginStatus && <Redirect to="/profile" />}
  
    </>
  );
};

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, { userRegistration })(Registration);
