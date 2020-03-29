import React, { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskForm from "./TasksForm/AddTaskForm";
import Tasks from "./Tasks";
import PopupButton from "./TasksForm/PopupButton";
import { connect } from "react-redux";
import {
  addTask,
  deleteTask,
  deleteReceivedTask
} from "../../../store/actions/userAction";

class TasksList extends PureComponent {
  // state = {
  //   currentUser: {}
  // };
  // componentDidMount() {
  //   const data = JSON.parse(localStorage.getItem("currentUser"));
  //   this.setState({ currentUser: data });
  // }

  onSubmit = ({ task }) => {
    const newTask = { id: uuidv4(), task };
    this.props.addTask(newTask);
    // const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
    // this.setState({ currentUser: updatedUser });
  };

  onDeleteMyTask = id => {
    this.props.deleteTask(id);
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // this.setState({ currentUser });
  };

  onDeleteReceivedTask = id => {
    this.props.deleteReceivedTask(id);
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // this.setState({ currentUser });
  };
  render() {
    // const { currentUser } = this.state;
    return (
      <>
        <div className="row container">
          <Tasks
            onDelete={this.onDeleteMyTask}
            tasks={this.props.tasks}
            label="My Tasks"
          />
          <Tasks
            onDelete={this.onDeleteReceivedTask}
            label="Received Tasks"
            tasks={this.props.receivedTasks}
          />
          <AddTaskForm onSubmit={this.onSubmit} />
        </div>
        <PopupButton />
      </>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.userReducer.tasks,
  receivedTasks: state.userReducer.receivedTasks,
})

export default connect(mapStateToProps, { addTask, deleteTask, deleteReceivedTask })(
  TasksList
);
