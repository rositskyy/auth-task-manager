import {
  USER_LOGIN,
  USER_LOGOUT,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  DELETE_RECEIVED_TASK
} from "./actiontypes";
import API from "../../API";

export const userLogin = ({ login, password }) => dispatch => {
  const user = API.login({ login, password });
  if (user) {
    dispatch({
      type: USER_LOGIN,
      payload: user
    });
    return true;
  } else return false;
};

export const userLogout = () => dispatch => {
  if (window.confirm("Want log out?")) {
    API.closeCurrentSession();
    dispatch({
      type: USER_LOGOUT
    });
  } else return false;
};

export const userRegistration = ({ login, password }) => dispatch => {
  const registrationProcess = API.register({ login, password });
  if (registrationProcess) {
    return true;
  } else return false;
};

export const restoreSession = () => dispatch => {
  const user = API.restoreSession();
  if (user) {
    dispatch({
      type: USER_LOGIN,
      payload: user
    });
  }
};

export const addTask = task => dispatch => {
  const newTask = API.addTask(task);
  dispatch({
    type: ADD_TASK,
    payload: newTask
  });
};

export const deleteTask = id => dispatch => {
  API.deleteTask(id);
  dispatch({
    type: DELETE_TASK,
    payload: id
  });
};

export const deleteReceivedTask = id => dispatch => {
  API.deleteReceivedTask(id);
  dispatch({
    type: DELETE_RECEIVED_TASK,
    payload: id
  });
};

export const sendTask = (task, receiver) => dispatch => {
  API.sendTask(task, receiver);
};

export const updateTask = (id, task) => dispatch => {
  API.updateTask(id, task);
  dispatch({
    type: UPDATE_TASK,
    payload: {
      id,
      task
    }
  });
};
