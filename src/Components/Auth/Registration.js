import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";
import { connect } from "react-redux";
import { userRegistration } from "../../store/actions/userAction";

class Registration extends PureComponent {
  state = {
    alertWarn: false
  };

  componentWillUnmount() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

  timeoutId = null;

  onSubmitRegister = ({ login, password }) => {
    const registerResult = this.props.userRegistration({ login, password });
    if (registerResult) {
      alert("user created succesful");
      this.props.history.push("/login");
    } else {
      this.setState({ alertWarn: true });
      this.timeoutId = setTimeout(() => {
        this.setState({ alertWarn: false });
      }, 3000);
    }
  };

  render() {
    return (
      <>
        <div className="row container">
          {this.state.alertWarn && (
            <div className="col s12">
              <Alert
                type="alert_warn"
                text="Username is already exists, try another name"
              />
            </div>
          )}
          <h5 style={{ textAlign: "center", color: "grey" }}>Registration</h5>
          <AuthForm onSubmit={this.onSubmitRegister} />
        </div>
        {this.props.loginStatus && <Redirect to="/profile" />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, { userRegistration })(Registration);
