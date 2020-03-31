import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";
import { connect } from "react-redux";
import { userLogIn } from "../../store/actions/userAction";

const Login = ({ loginStatus, userLogIn, history }) => {
  const [alertLoginFailed, setAlertLoginFailed] = useState(false);
  useEffect(() => {
    let alertWarnTimeout = setTimeout(() => setAlertLoginFailed(false), 3000);
    return () => {
      clearTimeout(alertWarnTimeout);
    };
  }, [alertLoginFailed]);

  const onSubmitLogIn = ({ login, password }) => {
    const loginProcess = userLogIn({ login, password });
    if (loginProcess) {
      alert("You have logged succesful");
      return history.push("/profile");
    } else {
      setAlertLoginFailed(true);
    }
  };

  return (
    <>
      <div className="row container">
        {alertLoginFailed && (
          <div className="col s12">
            <Alert
              type="alert_warn"
              text="Username or password isn't correct!"
            />
          </div>
        )}
        <h5 style={{ textAlign: "center", color: "grey" }}>Login</h5>
        <AuthForm onSubmit={onSubmitLogIn} />
      </div>
      {loginStatus && <Redirect to="/profile" />}
    </>
  );
};

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, { userLogIn })(Login);
