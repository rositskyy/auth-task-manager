import React, { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskForm from "./TasksForm/AddTaskForm";
import Tasks from "./Tasks";
import PopupButton from "./TasksForm/PopupButton";
import { connect } from "react-redux";
import { addTask } from "../../../store/actions/userAction";

class TasksList extends PureComponent {
  state = {
    currentUser: {},
    tasks: []
  };
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    const usertasks = JSON.parse(localStorage.getItem("currentUser")).tasks;
    this.setState({ currentUser: data, tasks: usertasks });
  }

  onSubmit = ({ task }) => {
    const newTask = { id: uuidv4(), task };
    this.props.addTask(newTask);
    //fix
  };

  onDeleteMyTask = id => {
    //Update current storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks = currentUser.tasks.filter(item => item.id !== id);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.setState({ currentUser });
    // Update main storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  onDeleteReceivedTask = id => {
    //Update current storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.receivedTasks = currentUser.receivedTasks.filter(
      item => item.id !== id
    );
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.setState({ currentUser });
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
    const { currentUser } = this.state;
    return (
      <>
        <div className="row container">
          <Tasks
            onDelete={this.onDeleteMyTask}
            tasks={currentUser.tasks}
            label="My Tasks"
          />
          <Tasks
            onDelete={this.onDeleteReceivedTask}
            label="Received Tasks"
            tasks={currentUser.receivedTasks}
          />
          <AddTaskForm onSubmit={this.onSubmit} />
        </div>
        <PopupButton />
      </>
    );
  }
}

export default connect(null, { addTask })(TasksList);
