class AppStorage {
  constructor(key) {
    this.key = key;
  }

  set(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  get() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

const appStorage = {
  setup: new AppStorage("UserSetupData"),
};
