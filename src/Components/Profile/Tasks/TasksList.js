import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskForm from "./TasksForm/AddTaskForm";
import Tasks from "./Tasks";
import Popup from "reactjs-popup";
import SendTaskForm from "./TasksForm/SendTaskForm";

class TasksList extends Component {
  state = {
    currentUser: {},
    text: ""
  };
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    this.setState({ currentUser: data });
  }
  addTaskToLocalStorage = value => {
    // Saving current user
    const user = JSON.parse(localStorage.getItem("currentUser"));
    user.tasks.push(value);
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.setState({ currentUser: user });

    // Update tasks in accounts storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(user.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = user;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  onChange = e => {
    this.setState({ text: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newTask = { id: uuidv4(), task: this.state.text };
    this.addTaskToLocalStorage(newTask);
    this.setState({ text: "" });
  };

  onDeleteMyTask = id => {
    //Update current storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks = currentUser.tasks.filter(item => item.id !== id);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update main storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
    this.setState({ currentUser: currentUser });
  };

  onDeleteReceivedTask = id => {
    //Update current storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.receivedTasks = currentUser.receivedTasks.filter(
      item => item.id !== id
    );
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.setState({ currentUser: currentUser });

    // Update main storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  render() {
    const { currentUser, text } = this.state;
    return (
      <>
        <div className="row container">
          <Tasks
            onDelete={this.onDeleteMyTask}
            tasks={currentUser.tasks}
            label='My Tasks'
          />
          <Tasks
            onDelete={this.onDeleteReceivedTask}
            tasks={currentUser.receivedTasks}
            label="Received Tasks"
          />
          <AddTaskForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            inputText={text}
          />
        </div>
        <div className="container">
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

export default TasksList;
