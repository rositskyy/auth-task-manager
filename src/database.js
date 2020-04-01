class database {
  static getStorage(name) {
    return JSON.parse(localStorage.getItem(name));
  }
  static setStorage(name, value) {
    return localStorage.setItem(name, JSON.stringify(value));
  }
  static removeItemFromStorage(name) {
    return localStorage.removeItem(name);
  }
}

export default database;
