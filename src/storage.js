class storage {
  static get(name) {
    return JSON.parse(localStorage.getItem(name));
  }
  static set(name, value) {
    return localStorage.setItem(name, JSON.stringify(value));
  }
  static removeItemFromStorage(name) {
    return localStorage.removeItem(name);
  }

  static replaceOldData(usersAccounts, currentUser) {
    const ids = usersAccounts.map(e => e.id);
    const elementIndex = ids.indexOf(currentUser.id);
    if (elementIndex !== -1) {
      usersAccounts[elementIndex] = currentUser;
    }
    return usersAccounts;
  }
}

export default storage;
