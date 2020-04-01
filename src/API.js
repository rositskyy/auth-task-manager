import { v4 as uuidv4 } from "uuid";
import FN from "./FN";

class API {
  static register({ login, password }) {
    const usersAccounts = FN.getStorage("accounts") || [];
    const isUserNameExists = usersAccounts.find(
      account => account.login === login
    );
    if (isUserNameExists) {
      return false;
    }
    const newUser = {
      id: uuidv4(),
      login,
      password,
      tasks: [],
      receivedTasks: []
    };
    usersAccounts.push(newUser);
    FN.setStorage("accounts", usersAccounts);
    return true;
  }

  static login({ login, password }) {
    const usersAccounts = FN.getStorage("accounts") || [];
    const userPayload = usersAccounts.find(
      account => account.login === login && account.password === password
    );
    if (userPayload) {
      FN.setStorage("currentUser", userPayload);
      FN.setStorage("logged", true);
      return userPayload;
    } else {
      return false;
    }
  }

  static restoreSession() {
    const isUserSignedIn = FN.getStorage("currentUser");
    if (isUserSignedIn) {
      return isUserSignedIn;
    }
    return null;
  }

  static addTask(task) {
    // Add task to currentUser storage
    const currentUser = FN.getStorage("currentUser");
    const newTask = {
      id: uuidv4(),
      task,
      date: new Date(),
      authorId: currentUser.id
    };
    currentUser.tasks.unshift(newTask);
    FN.setStorage("currentUser", currentUser);

    // Add task to accounts storage the user
    const usersAccounts = FN.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    FN.setStorage("accounts", usersAccounts);
    return newTask;
  }

  static deleteTask(id) {
    // Delete task from currentUser storage
    const currentUser = FN.getStorage("currentUser");
    currentUser.tasks = currentUser.tasks.filter(item => item.id !== id);
    FN.setStorage("currentUser", currentUser);

    // Delete task from accounts storage the user
    const usersAccounts = FN.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    FN.setStorage("accounts", usersAccounts);
  }

  static deleteReceivedTask(id) {
    // Delete received task from currentUser storage
    const currentUser = FN.getStorage("currentUser");
    currentUser.receivedTasks = currentUser.receivedTasks.filter(
      item => item.id !== id
    );
    FN.setStorage("currentUser", currentUser);

    // Delete received task from accounts storage the user
    const usersAccounts = FN.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    FN.setStorage("accounts", usersAccounts);
  }

  static updateTask(id, task) {
    // Update the task currentUser storage
    const currentUser = FN.getStorage("currentUser");
    const tasks = currentUser.tasks;
    const taskIds = tasks.map(e => e.id);

    const taskElementIndex = taskIds.indexOf(id);
    if (taskElementIndex !== -1) {
      tasks[taskElementIndex] = { id, task, date: new Date() };
    }
    FN.setStorage("currentUser", currentUser);

    // Update the task in accounts storage the user
    const usersAccounts = FN.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    FN.setStorage("accounts", usersAccounts);
  }

  static sendTask(task, receiver) {
    const usersAccounts = FN.getStorage("accounts");
    const author = FN.getStorage("currentUser");

    const foundUser = usersAccounts.find(account => account.login === receiver);
    const newTask = {
      id: uuidv4(),
      task,
      authorName: author.login,
      authorId: author.id,
      date: new Date()
    };
    foundUser.receivedTasks.unshift(newTask);

    // Add sent task to user in accounts storage
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(foundUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = foundUser;
    }
    FN.setStorage("accounts", usersAccounts);
  }

  static closeCurrentSession() {
    FN.removeItemFromStorage("logged");
    FN.removeItemFromStorage("currentUser");
  }

  static getAllAccounts() {
    return FN.getStorage("accounts");
  }
}

export default API;
