import React, { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Alert from "./Alert";

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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitRegister = ({login, password}) => {
    const newUser = {
      id: uuidv4(),
      login,
      password,
      tasks: [],
      receivedTasks: []
    };

    const storage = JSON.parse(localStorage.getItem("accounts"));
    const existUserName = storage && storage.find(item => item.login === login);
    if (existUserName) {
      this.setState({ alertWarn: true });
      this.timeoutId = setTimeout(() => {
        this.setState({ alertWarn: false });
      }, 2000);
    } else {
      this.addToLocalStorageArray("accounts", newUser);

      this.setState({ login: "", password: "" });
      this.props.history.push("/login");
      alert("Account created succesfull, now you can log in");
    }
  };

  addToLocalStorageArray = (name, value) => {
    const accountsPayload = localStorage.getItem(name);
    const accounts = accountsPayload ? JSON.parse(accountsPayload) : [];
    accounts.push(value);
    localStorage.setItem(name, JSON.stringify(accounts));
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
                text="Username is already exists, try another name"
              />
            </div>
          )}
          <h5 style={{ textAlign: "center", color: "grey" }}>Registration</h5>
          <AuthForm
            // onChange={this.onChange}
            onSubmit={this.onSubmitRegister}
          />
        </div>
        {isLogged && <Redirect to="/profile" />}
      </>
    );
  }
}

export default Registration;
