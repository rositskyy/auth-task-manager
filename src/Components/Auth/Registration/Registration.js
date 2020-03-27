import React, { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import Alert from "../Alert";

class Registration extends PureComponent {
  state = {
    id: null,
    user: "",
    password: "",
    alertWarn: false
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitRegister = e => {
    e.preventDefault();
    const { user, password } = this.state;
    const newUser = {
      id: uuidv4(),
      user,
      password,
      tasks: [],
      receivedTasks: []
    };

    const storage = JSON.parse(localStorage.getItem("accounts"));
    const existUserName = storage && storage.find(item => item.user === user);
    if (existUserName) {
      this.setState({ alertWarn: true });
      setTimeout(() => {
        this.setState({ alertWarn: false });
      }, 2000);
    } else {
      this.addToLocalStorageArray("accounts", newUser);

      this.setState({ user: "", password: "" });
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
          <RegistrationForm
            onChange={this.onChange}
            onSubmitRegister={this.onSubmitRegister}
          />
        </div>
        {isLogged && <Redirect to="/profile" />}
      </>
    );
  }
}

export default Registration;
