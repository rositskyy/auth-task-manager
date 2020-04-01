import { v4 as uuidv4 } from "uuid";
import database from "./database";

class API {
  static register({ login, password }) {
    const usersAccounts = database.getStorage("accounts") || [];

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
    database.setStorage("accounts", usersAccounts);
    return true;
  }

  static login({ login, password }) {
    const usersAccounts = database.getStorage("accounts") || [];
    const userPayload = usersAccounts.find(
      account => account.login === login && account.password === password
    );
    if (userPayload) {
      database.setStorage("currentUser", userPayload);
      database.setStorage("logged", true);
      return userPayload;
    } else {
      return false;
    }
  }

  static restoreSession() {
    const isUserSignedIn = database.getStorage("currentUser");
    if (isUserSignedIn) {
      return isUserSignedIn;
    }
    return null;
  }

  static addTask(task) {
    // Add task to currentUser storage
    const currentUser = database.getStorage("currentUser");
    const newTask = {
      id: uuidv4(),
      task,
      date: new Date(),
      authorId: currentUser.id
    };
    currentUser.tasks.unshift(newTask);
    database.setStorage("currentUser", currentUser);

    // Add task to accounts storage the user
    const usersAccounts = database.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    database.setStorage("accounts", usersAccounts);
    return newTask;
  }

  static deleteTask(id) {
    // Delete task from currentUser storage
    const currentUser = database.getStorage("currentUser");
    currentUser.tasks = currentUser.tasks.filter(item => item.id !== id);
    database.setStorage("currentUser", currentUser);

    // Delete task from accounts storage the user
    const usersAccounts = database.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    database.setStorage("accounts", usersAccounts);
  }

  static deleteReceivedTask(id) {
    // Delete received task from currentUser storage
    const currentUser = database.getStorage("currentUser");
    currentUser.receivedTasks = currentUser.receivedTasks.filter(
      item => item.id !== id
    );
    database.setStorage("currentUser", currentUser);

    // Delete received task from accounts storage the user
    const usersAccounts = database.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    database.setStorage("accounts", usersAccounts);
  }

  static updateTask(id, task) {
    // Update the task currentUser storage
    const currentUser = database.getStorage("currentUser");
    const tasks = currentUser.tasks;
    const taskIds = tasks.map(e => e.id);

    const taskElementIndex = taskIds.indexOf(id);
    if (taskElementIndex !== -1) {
      tasks[taskElementIndex] = { id, task, date: new Date() };
    }
    database.setStorage("currentUser", currentUser);

    // Update the task in accounts storage the user
    const usersAccounts = database.getStorage("accounts");
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    database.setStorage("accounts", usersAccounts);
  }

  static sendTask(task, receiver) {
    const usersAccounts = database.getStorage("accounts");
    const author = database.getStorage("currentUser");

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
    database.setStorage("accounts", usersAccounts);
  }

  static closeCurrentSession() {
    database.removeItemFromStorage("logged");
    database.removeItemFromStorage("currentUser");
  }

  static getAllAccounts() {
    return database.getStorage("accounts");
  }
}

export default API;
