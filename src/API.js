const TASKS_KEY = "Tasks";
class API {
  static saveTasks(tasks = []) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
}

export default API;