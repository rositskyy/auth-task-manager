import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";
import { connect } from "react-redux";
import { userSignIn } from "../../store/actions/userAction";
import { Link } from "react-router-dom";

const Registration = ({ loginStatus, userSignIn }) => {
  const [alertSignInFailed, setAlertSignInFailed] = useState(false);

  const [alertSignInSuccesful, setAlertSignInSuccesful] = useState(false);

  useEffect(() => {
    let alertWarnTimeout = setTimeout(() => setAlertSignInFailed(false), 3000);
    return () => {
      clearTimeout(alertWarnTimeout);
    };
  }, [alertSignInFailed]);

  const onSubmitRegister = ({ login, password }) => {
    const registerResult = userSignIn({ login, password });
    if (registerResult) {
      setAlertSignInSuccesful(true);
    } else {
      setAlertSignInFailed(true);
    }
  };
  return (
    <>
      <div className="row container">
        {alertSignInFailed && (
          <div className="col s12">
            <Alert
              type="alert_warn"
              text="Username is already exists, try another name"
            />
          </div>
        )}
        <h5 style={{ textAlign: "center", color: "grey" }}>Registration</h5>
        <AuthForm onSubmit={onSubmitRegister} />
        {alertSignInSuccesful && (
          <div className="col s12 alert_succesful">
            <Alert text="Account created succesful" />
            <Link
              to="/login"
              style={{
                textAlign: "center",
                fontWeight: "400",
                fontStyle: "italic"
              }}
            >
              Log In!
            </Link>
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

export default connect(mapStateToProps, { userSignIn })(Registration);
