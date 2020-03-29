import { v4 as uuidv4 } from "uuid";

class API {
  static login({ login, password }) {
    const usersAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const userPayload =
      usersAccounts &&
      usersAccounts.find(
        account => account.login === login && account.password === password
      );
    if (userPayload) {
      localStorage.setItem("currentUser", JSON.stringify(userPayload));
      localStorage.setItem("logged", true);
      return userPayload;
    } else {
      return false;
    }
  }

  static restoreSession() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      return currentUser;
    }
    return null;
  }

  static register({ login, password }) {
    const storage = JSON.parse(localStorage.getItem("accounts"));
    const existUserName = storage && storage.find(item => item.login === login);
    if (existUserName) {
      return false;
    }
    const newUser = {
      id: uuidv4(),
      login,
      password,
      tasks: [],
      receivedTasks: []
    };
    const accountsPayload = localStorage.getItem("accounts");
    const accounts = accountsPayload ? JSON.parse(accountsPayload) : [];
    accounts.push(newUser);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    return true;
  }

  static addTask(newTask) {
    // Saving current user
    const user = JSON.parse(localStorage.getItem("currentUser"));
    user.tasks.push(newTask);
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Update tasks in accounts storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(user.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = user;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  static deleteTask(id) {
    //Update current storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks = currentUser.tasks.filter(item => item.id !== id);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update main storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  static deleteReceivedTask(id) {
    //Update current storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.receivedTasks = currentUser.receivedTasks.filter(
      item => item.id !== id
    );
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // Update main storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
}

export default API;
