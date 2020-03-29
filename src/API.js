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
    const isUserSignedIn = JSON.parse(localStorage.getItem("currentUser"));
    if (isUserSignedIn) {
      return isUserSignedIn;
    }
    return null;
  }

  static register({ login, password }) {
    const accountsPayload = localStorage.getItem("accounts");
    const accounts = accountsPayload ? JSON.parse(accountsPayload) : [];
    const existUserName =
      accounts && accounts.find(item => item.login === login);
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
    accounts.push(newUser);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    return true;
  }

  static addTask(task) {
    // Saving current user
    const newTask = { id: uuidv4(), task, date: new Date() };
    const user = JSON.parse(localStorage.getItem("currentUser"));
    user.tasks.unshift(newTask);
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Update tasks in accounts storage
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(user.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = user;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
    return newTask;
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

  static sendTask(task, receiver, author) {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    // Send to user [foundUser]
    const foundUser = accounts.find(item => item.login === receiver);
    const newTask = {
      id: uuidv4(),
      task,
      author,
      date: new Date()
    };
    foundUser.receivedTasks.unshift(newTask);
    // Update accounts info
    const ids = accounts.map(e => e.id);
    const elementIndex = ids.indexOf(foundUser.id);
    if (elementIndex !== -1) {
      accounts[elementIndex] = foundUser;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  static closeCurrentSession() {
    localStorage.removeItem("logged");
    localStorage.removeItem("currentUser");
  }
}

export default API;
