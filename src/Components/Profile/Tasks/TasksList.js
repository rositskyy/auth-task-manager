import React from "react";
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

const TasksList = ({
  addTask,
  deleteTask,
  deleteReceivedTask,
  tasks,
  receivedTasks
}) => {
  const onSubmit = ({ task }) => {
    const newTask = { id: uuidv4(), task };
    addTask(newTask);
  };

  const onDeleteMyTask = id => {
    deleteTask(id);
  };

  const onDeleteReceivedTask = id => {
    deleteReceivedTask(id);
  };
  return (
    <>
      <div className="row container">
        <Tasks onDelete={onDeleteMyTask} tasks={tasks} label="My Tasks" />
        <Tasks
          onDelete={onDeleteReceivedTask}
          label="Received Tasks"
          tasks={receivedTasks}
        />
        <AddTaskForm onSubmit={onSubmit} />
      </div>
      <PopupButton />
    </>
  );
};

const mapStateToProps = state => ({
  tasks: state.userReducer.tasks,
  receivedTasks: state.userReducer.receivedTasks
});

export default connect(mapStateToProps, {
  addTask,
  deleteTask,
  deleteReceivedTask
})(TasksList);
