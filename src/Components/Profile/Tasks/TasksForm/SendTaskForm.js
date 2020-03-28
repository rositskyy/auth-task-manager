import React, { Component } from "react";
import SelectOption from "./SelectOption";
import { v4 as uuidv4 } from "uuid";

class SendTaskForm extends Component {
  state = {
    receiver: "select",
    task: ""
  };

  onChange = e => {
    this.setState({ task: e.target.value });
  };
  handleChange = e => {
    this.setState({ receiver: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    alert(`Task have been sent to ${this.state.receiver} succesful!`)
    this.addSentTaskToLocalStorage("accounts");
  };

  addSentTaskToLocalStorage = name => {
    const { receiver, task } = this.state;
    // All users from localstorage
    const data = { id: uuidv4(), task };
    const existing = JSON.parse(localStorage.getItem(name));
    // Send to user [foundUser]
    const foundUser = existing.find(item => item.user === receiver);
    foundUser.receivedTasks.push(data);
    // Update accounts info
    const ids = existing.map(e => e.id);
    const elementIndex = ids.indexOf(foundUser.id);
    if (elementIndex !== -1) {
      existing[elementIndex] = foundUser;
    }
    localStorage.setItem("accounts", JSON.stringify(existing));
  };
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit} className="col s12 container">
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              type="text"
              required
              value={this.state.task}
            />
            <label htmlFor="task">Enter text</label>
            <SelectOption
              handleChange={this.handleChange}
              selectValue={this.state.receiver}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default SendTaskForm;
