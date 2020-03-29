import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";
import { connect } from "react-redux";
import { userLogin } from "../../store/actions/userAction";

const Login = ({ loginStatus, userLogin, history }) => {
  const [alertWarn, setAlertWarn] = useState(false);
  useEffect(
    () => {
      let timeout = setTimeout(() => setAlertWarn(false), 3000);
      return () => {
        clearTimeout(timeout);
      };
    },
    [alertWarn]
  );

  const onSubmitLogin = ({ login, password }) => {
    const loginProcess = userLogin({ login, password });
    if (loginProcess) {
      alert("You have logged succesful");
      return history.push("/profile");
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
              text="Username or password isn't correct!"
            />
          </div>
        )}
        <h5 style={{ textAlign: "center", color: "grey" }}>Login</h5>
        <AuthForm onSubmit={onSubmitLogin} />
      </div>
      {loginStatus && <Redirect to="/profile" />}
    </>
  );
};

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, { userLogin })(Login);
