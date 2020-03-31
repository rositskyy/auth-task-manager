import { v4 as uuidv4 } from "uuid";

class API {
  static register({ login, password }) {
    const usersAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
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
    localStorage.setItem("accounts", JSON.stringify(usersAccounts));
    return true;
  }

  static login({ login, password }) {
    const usersAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const userPayload = usersAccounts.find(
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

  static addTask(task) {
    // Add task to currentUser storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const newTask = {
      id: uuidv4(),
      task,
      date: new Date(),
      authorId: currentUser.id
    };
    currentUser.tasks.unshift(newTask);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Add task to accounts storage the user
    const usersAccounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(usersAccounts));
    return newTask;
  }

  static deleteTask(id) {
    // Delete task from currentUser storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks = currentUser.tasks.filter(item => item.id !== id);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Delete task from accounts storage the user
    const usersAccounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(usersAccounts));
  }

  static deleteReceivedTask(id) {
    // Delete received task from currentUser storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.receivedTasks = currentUser.receivedTasks.filter(
      item => item.id !== id
    );
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Delete received task from accounts storage the user
    const usersAccounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(usersAccounts));
  }

  static updateTask(id, task) {
    // Update the task currentUser storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const tasks = currentUser.tasks;
    const taskIds = tasks.map(e => e.id);

    const taskElementIndex = taskIds.indexOf(id);
    if (taskElementIndex !== -1) {
      tasks[taskElementIndex] = { id, task, date: new Date() };
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update the task in accounts storage the user
    const usersAccounts = JSON.parse(localStorage.getItem("accounts"));
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    localStorage.setItem("accounts", JSON.stringify(usersAccounts));
  }

  static sendTask(task, receiver) {
    const usersAccounts = JSON.parse(localStorage.getItem("accounts"));
    const author = JSON.parse(localStorage.getItem("currentUser"));

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
    localStorage.setItem("accounts", JSON.stringify(usersAccounts));
  }

  static closeCurrentSession() {
    localStorage.removeItem("logged");
    localStorage.removeItem("currentUser");
  }

  static getAllAccounts() {
    return JSON.parse(localStorage.getItem("accounts"));
  }
}

export default API;
