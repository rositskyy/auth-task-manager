import {
  USER_LOGOUT,
  USER_LOGIN,
  LOGIN_FAILED,
  ADD_TASK
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
        loginStatus: true
      };

    case USER_LOGOUT:
      return initialState;
    case LOGIN_FAILED:
      return initialState;
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.currentUser.tasks, action.payload]
      };
    default:
      return state;
  }
};

export default userReducer;
