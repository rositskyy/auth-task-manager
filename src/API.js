import { v4 as uuidv4 } from "uuid";
import storage from "./storage";

class API {
  static register({ login, password }) {
    const usersAccounts = storage.get("accounts") || [];

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
    storage.set("accounts", usersAccounts);
    return true;
  }

  static login({ login, password }) {
    const usersAccounts = storage.get("accounts") || [];
    const userPayload = usersAccounts.find(
      account => account.login === login && account.password === password
    );
    if (userPayload) {
      storage.set("currentUser", userPayload);
      storage.set("logged", true);
      return userPayload;
    } else {
      return false;
    }
  }

  static restoreSession() {
    const isUserSignedIn = storage.get("currentUser");
    if (isUserSignedIn) {
      return isUserSignedIn;
    }
    return null;
  }

  static addTask(task) {
    // Add task to currentUser storage
    const currentUser = storage.get("currentUser");
    const newTask = {
      id: uuidv4(),
      task,
      date: new Date(),
      authorId: currentUser.id
    };
    currentUser.tasks.unshift(newTask);
    storage.set("currentUser", currentUser);

    // Add task to accounts storage the user
    const usersAccounts = storage.get("accounts");
    storage.replaceOldData(usersAccounts, currentUser);
    storage.set("accounts", usersAccounts);
    return newTask;
  }

  static deleteTask(id) {
    // Delete task from currentUser storage
    const currentUser = storage.get("currentUser");
    currentUser.tasks = currentUser.tasks.filter(item => item.id !== id);
    storage.set("currentUser", currentUser);

    // Delete task from accounts storage the user
    const usersAccounts = storage.get("accounts");
    storage.replaceOldData(usersAccounts, currentUser);
    storage.set("accounts", usersAccounts);
  }

  static deleteReceivedTask(id) {
    // Delete received task from currentUser storage
    const currentUser = storage.get("currentUser");
    currentUser.receivedTasks = currentUser.receivedTasks.filter(
      item => item.id !== id
    );
    storage.set("currentUser", currentUser);

    // Delete received task from accounts storage the user
    const usersAccounts = storage.get("accounts");
    storage.replaceOldData(usersAccounts, currentUser);
    storage.set("accounts", usersAccounts);
  }

  static updateTask(id, task) {
    // Update the task currentUser storage
    const currentUser = storage.get("currentUser");
    const tasks = currentUser.tasks;
    const taskIds = tasks.map(e => e.id);

    const taskElementIndex = taskIds.indexOf(id);
    if (taskElementIndex !== -1) {
      tasks[taskElementIndex] = { id, task, date: new Date() };
    }
    storage.set("currentUser", currentUser);

    // Update the task in accounts storage the user
    const usersAccounts = storage.get("accounts");
    storage.replaceOldData(usersAccounts, currentUser);
    storage.set("accounts", usersAccounts);
  }

  static sendTask(task, receiver) {
    const usersAccounts = storage.get("accounts");
    const author = storage.get("currentUser");

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
    storage.set("accounts", usersAccounts);
  }

  static closeCurrentSession() {
    storage.removeItemFromStorage("logged");
    storage.removeItemFromStorage("currentUser");
  }

  static getAllAccounts() {
    return storage.get("accounts");
  }
}

export default API;
