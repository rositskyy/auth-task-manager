import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import Alert from "../Alert";

class Login extends PureComponent {
  state = {
    user: "",
    password: "",
    alertWarn: false
  };
  onSubmitLogin = e => {
    e.preventDefault();
    const { user, password } = this.state;
    const getUsersAccounts = JSON.parse(localStorage.getItem("accounts"));
    const isUserExist =
      getUsersAccounts &&
      getUsersAccounts.find(
        account => account.user === user && account.password === password
      );
    if (isUserExist) {
      //Set currentUser object in LocalStorage
      localStorage.setItem("currentUser", JSON.stringify(isUserExist));
      //Set logged status in LocalStorage
      localStorage.setItem("logged", true);
      this.props.history.push("/profile");
      alert("You have logged succesful");
    } else {
      this.setState({ alertWarn: true });
      setTimeout(() => {
        this.setState({ alertWarn: false });
      }, 2000);
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
            <Alert type="alert_warn" text="Username or password isn't correct!"/>
          </div>
          )}
          <h5 style={{ textAlign: "center", color: "grey" }}>Login</h5>
          <LoginForm
            onChange={this.onChange}
            onSubmitLogin={this.onSubmitLogin}
          />
        </div>
        {isLogged && <Redirect to="/profile" />}
      </>
    );
  }
}

export default Login;
