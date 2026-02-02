class localStorageManager {
  #KEYS = {
    WORDS: "LocalWordsData",
    PROGRESS: "LocalProgressData",
  };

  #load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  #save(key, payload) {
    localStorage.setItem(key, JSON.stringify(payload));
  }

  loadWords() {
    return this.#load(this.#KEYS.WORDS) || [];
  }

  loadProgress() {
    return this.#load(this.#KEYS.PROGRESS) || {};
  }

  saveWords(words) {
    this.#save(this.#KEYS.WORDS, words);
  }

  saveProgress(progress) {
    this.#save(this.#KEYS.PROGRESS, progress);
  }
}

class ApiClient {
  async #fetch(body) {
    const res = await fetch("/api/dataio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  async loadWords() {
    const res = await fetch("/resource/vocabulary.json");
    return res.json();
  }

  async loadProgress() {
    return (await this.#fetch({ action: "load" })) || [];
  }

  async saveProgress(progress) {
    await this.#fetch({ action: "save", payload: progress });
  }
}

class DataRepository {
  constructor() {
    this.local = new localStorageManager();
    this.server = new ApiClient();
  }

  loadFromLocal() {
    const words = this.local.loadWords();
    const progress = this.local.loadProgress();
    return { words, progress };
  }

  saveToLocal({ words, progress }) {
    if (words) this.local.saveWords(words);
    if (progress) this.local.saveProgress(progress);
  }

  async loadFromServer() {
    const words = await this.server.loadWords();
    const progress = await this.server.loadProgress();
    return { words, progress };
  }

  async saveToServer(progress) {
    await this.server.saveProgress(progress);
  }
}

class Popup {
  constructor(id) {
    this.popupEl = document.getElementById(id);
    this.popupCoverEl = this.popupEl.querySelector(".popup__cover");
    this.popupMessageEl = this.popupEl.querySelector(".popup__message");
    this.popupButtonYesEl = this.popupEl.querySelector(".popup__button--yes");
    this.popupButtonNoEl = this.popupEl.querySelector(".popup__button--no");
  }

  confirm(message = null) {
    this.popupMessageEl.textContent = message || "確認（y/n）";
    this.popupEl.classList.add("visible");

    this.popupEl.classList.add("disable");
    this.popupButtonYesEl.disabled = true;
    this.popupButtonNoEl.disabled = true;
    setTimeout(() => {
      this.popupEl.classList.remove("disable");
      this.popupButtonYesEl.disabled = false;
      this.popupButtonNoEl.disabled = false;
    }, 3000);

    return new Promise((resolve) => {
      const onYes = () => {
        cleanup();
        resolve(true);
      };

      const onNo = () => {
        cleanup();
        resolve(false);
      };

      const cleanup = () => {
        this.popupCoverEl.removeEventListener("click", onNo);
        this.popupButtonYesEl.removeEventListener("click", onYes);
        this.popupButtonNoEl.removeEventListener("click", onNo);
        this.popupEl.classList.remove("visible");
      };

      this.popupCoverEl.addEventListener("click", onNo);
      this.popupButtonYesEl.addEventListener("click", onYes);
      this.popupButtonNoEl.addEventListener("click", onNo);
    });
  }
}

class App {
  constructor() {
    this.dataRepository = new DataRepository();
    this.popup = new Popup("popup");

    this.words = [];
    this.progress = {};
  }

  init() {
    this.loadLocal();
  }

  loadLocal() {
    const loadData = this.dataRepository.loadFromLocal();
    this.words = loadData.words;
    this.progress = loadData.progress;
  }

  saveLocal() {
    const data = { words: this.words, progress: this.progress };
    this.dataRepository.saveToLocal(data);
  }

  async pullServer() {
    const data = await this.dataRepository.loadFromServer();
    this.words = data.words;
    this.progress = data.progress;
    this.saveLocal();
    console.log("PULL SUCCESS");
  }

  async pushServer() {
    this.saveLocal();
    await this.dataRepository.saveToServer(this.progress);
    console.log("PUSH SUCCESS");
  }

  async handleServerAction(actionType = null) {
    let message, action;
    if (actionType === "pull") {
      message = "サーバーからデータを取得しますか？";
      action = () => this.pullServer();
    } else if (actionType === "push") {
      message = "現在の進捗をサーバーに保存しますか？";
      action = () => this.pushServer();
    } else return;

    const confirmed = await this.popup.confirm(message);
    if (!confirmed) return;

    console.log("ok");
  }
}

const app = new App();
app.init();
app.handleServerAction("push");
