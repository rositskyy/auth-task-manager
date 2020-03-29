import { USER_LOGIN, USER_LOGOUT, ADD_TASK } from "./actiontypes";
import API from "../../API";

export const userLogin = ({ login, password }) => dispatch => {
  const user = API.login({ login, password });
  if (user) {
    dispatch({
      type: USER_LOGIN,
      payload: user
    });
  } else return null;
};

export const userLogout = () => dispatch => {
  localStorage.removeItem("logged");
  localStorage.removeItem("currentUser");
  dispatch({
    type: USER_LOGOUT
  });
};

export const userRegistration = ({ login, password }) => dispatch => {
  return API.register({ login, password });
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

export const addTask = newTask => dispatch => {
  API.addTask(newTask);
  dispatch({
      type: ADD_TASK,
      payload: newTask
  })
};
