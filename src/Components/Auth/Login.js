import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";

class Login extends PureComponent {
  state = {
    alertWarn: false
  };

  onSubmitLogin = ({ login, password }) => {
    const usersAccounts = JSON.parse(localStorage.getItem("accounts"));
    const userPayload =
      usersAccounts &&
      usersAccounts.find(
        account => account.login === login && account.password === password
      );

    if (userPayload) {
      //Set currentUser object in LocalStorage
      localStorage.setItem("currentUser", JSON.stringify(userPayload));

      //Set logged status in LocalStorage
      localStorage.setItem("logged", true);

      this.props.history.push("/profile");
      alert("You have logged succesful");
    } else {
      //timeout fix
      this.setState({ alertWarn: true });
      setTimeout(() => {
        this.setState({ alertWarn: false });
      }, 3000);
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const isLogged = localStorage.getItem("logged");
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
        {isLogged && <Redirect to="/profile" />}
      </>
    );
  }
}

export default Login;
