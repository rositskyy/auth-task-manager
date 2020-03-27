import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskForm from "./TasksForm/AddTaskForm";
import ReceivedTasks from "./TasksList/ReceivedTasks";
import MyTasks from "./TasksList/MyTasks";
import Popup from "reactjs-popup";
import SendTaskForm from "./TasksForm/SendTaskForm";

class Tasks extends Component {
  state = {
    currentStorage: [],
    text: ""
  };
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    this.setState({ currentStorage: data });
  }
  addTaskToLocalStorage = (name, value) => {
    // Saving current user
    const existing = JSON.parse(localStorage.getItem(name));
    existing.tasks.push(value);
    localStorage.setItem(name, JSON.stringify(existing));
    this.setState({ currentStorage: existing });

    // Update tasks in accounts storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(existing.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = existing;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  onChange = e => {
    this.setState({ id: uuidv4(), text: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const task = { id: uuidv4(), name: this.state.text };
    this.addTaskToLocalStorage("currentUser", task);
    this.setState({ text: "" });
  };

  onDeleteMyTask = id => {
    //Update current storage
    const currentStorage = JSON.parse(localStorage.getItem("currentUser"));
    currentStorage.tasks = currentStorage.tasks.filter(item => item.id !== id);
    localStorage.setItem("currentUser", JSON.stringify(currentStorage));

    // Update main storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentStorage.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = currentStorage;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
    this.setState({ currentStorage: currentStorage });
  };

  onDeleteReceivedTask = id => {
    //Update current storage
    const currentStorage = JSON.parse(localStorage.getItem("currentUser"));
    currentStorage.receivedTasks = currentStorage.receivedTasks.filter(
      item => item.id !== id
    );
    localStorage.setItem("currentUser", JSON.stringify(currentStorage));
    this.setState({ currentStorage: currentStorage });

    // Update main storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentStorage.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = currentStorage;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  render() {
    const { currentStorage, text } = this.state;
    return (
      <>
        <div className="row container">
          <MyTasks
            onDeleteMyTask={this.onDeleteMyTask}
            currentUser={currentStorage}
          />
          <ReceivedTasks
            onDeleteReceivedTask={this.onDeleteReceivedTask}
            currentUser={currentStorage}
          />
          <AddTaskForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            inputText={text}
          />
          <Popup
            trigger={<button className="btn popup_button"> Send task</button>}
            position="right top"
          >
            <div>
              <SendTaskForm />
            </div>
          </Popup>
        </div>
      </>
    );
  }
}

export default Tasks;
