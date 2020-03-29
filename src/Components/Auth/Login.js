import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";
import { connect } from "react-redux";
import { userLogin } from "../../store/actions/userAction";

class Login extends PureComponent {
  state = {
    alertWarn: false
  };

  timeoutId = null;

  componentWillUnmount() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

  onSubmitLogin = ({ login, password }) => {
    const loginProcess = this.props.userLogin({ login, password });
    if (loginProcess) {
      this.props.history.push("/profile");
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
                text="Username or password isn't correct!"
              />
            </div>
          )}
          <h5 style={{ textAlign: "center", color: "grey" }}>Login</h5>
          <AuthForm onSubmit={this.onSubmitLogin} />
        </div>
        {this.props.loginStatus && <Redirect to="/profile" />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.userReducer.loginStatus
});

export default connect(mapStateToProps, { userLogin })(Login);
