import {
  USER_LOGOUT,
  USER_LOGIN,
  LOGIN_FAILED,
  ADD_TASK,
  DELETE_TASK,
  DELETE_RECEIVED_TASK
} from "../actions/actiontypes";

const initialState = {
  currentUser: {},
  loginStatus: false,
  tasks: [],
  receivedTasks: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        loginStatus: true,
        tasks: action.payload.tasks,
        receivedTasks: action.payload.receivedTasks
      };

    case USER_LOGOUT:
      return initialState;
    case LOGIN_FAILED:
      return initialState;
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item=> item.id !== action.payload)
      };
    case DELETE_RECEIVED_TASK:
      return {
        ...state,
        receivedTasks: state.receivedTasks.filter(item=> item.id !== action.payload)
      };
    default:
      return state;
  }
};

export default userReducer;
