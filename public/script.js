class localStorageManager {
  #KEYS = {
    WORDS: "LocalWordsData",
    PROGRESS: "LocalProgressData",
    LAST_UPDATE: "LocalLastUpdateData",
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

  loadLastUpdate() {
    return this.#load(this.#KEYS.LAST_UPDATE) || "";
  }

  saveWords(words) {
    this.#save(this.#KEYS.WORDS, words);
  }

  saveProgress(progress) {
    this.#save(this.#KEYS.PROGRESS, progress);
  }

  saveLastUpdate(lastUpdate) {
    this.#save(this.#KEYS.LAST_UPDATE, lastUpdate);
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
    const lastUpdate = this.local.loadLastUpdate();
    return { words, progress, lastUpdate };
  }

  saveToLocal({ words, progress, lastUpdate }) {
    if (words) this.local.saveWords(words);
    if (progress) this.local.saveProgress(progress);
    if (lastUpdate) this.local.saveLastUpdate(lastUpdate);
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
  PARTS = { noun: "名", verb: "動", adjective: "形", adverb: "副", preposition: "前" };

  constructor() {
    this.dataRepository = new DataRepository();
    this.popup = new Popup("popup");

    this.words = [];
    this.progress = {};
    this.ui = {};
    this.containers = {};
    this.current = {};
  }

  init() {
    this.loadLocal();
    this.getElements();
    this.bindEvents();

    this.switchView("setup");
  }

  getElements() {
    [...document.querySelectorAll("[data-target]")].forEach((el) => (this.ui[el.dataset.target] = el));
    [...this.ui.outer.children].forEach((el) => (this.containers[el.dataset.container] = el));
  }

  bindEvents() {
    this.ui.setupForm.addEventListener("submit", (e) => this.startStudy(e));
    this.ui.openSettingButton.addEventListener("click", () => this.openSetting());
    this.ui.pullServerButton.addEventListener("click", () => this.handleServerAction("pull"));
    this.ui.pushServerButton.addEventListener("click", () => this.handleServerAction("push"));
    this.ui.answerButtonKnown.addEventListener("click", () => this.answer(true));
    this.ui.answerButtonUnknown.addEventListener("click", () => this.answer(false));
    this.ui.backHomeButton.addEventListener("click", () => this.switchView("setup"));
  }

  loadLocal() {
    const loadData = this.dataRepository.loadFromLocal();
    this.words = loadData.words;
    this.progress = loadData.progress;
    this.lastUpdate = loadData.lastUpdate;
  }

  saveLocal(saveWords = false) {
    const data = { progress: this.progress, lastUpdate: this.lastUpdate };
    if (saveWords) data.words = this.words;
    this.dataRepository.saveToLocal(data);
  }

  async pullServer() {
    const data = await this.dataRepository.loadFromServer();
    this.words = data.words;
    this.progress = data.progress;
    this.saveLocal(true);
    console.log("PULL SUCCESS");
  }

  async pushServer() {
    this.saveLocal();
    await this.dataRepository.saveToServer(this.progress);
    console.log("PUSH SUCCESS");
  }

  async handleServerAction(actionType = null) {
    let message, log, action;
    if (actionType === "pull") {
      message = "サーバーからデータを取得しますか？";
      log = "[取得] ";
      action = () => this.pullServer();
    } else if (actionType === "push") {
      message = "現在の進捗をサーバーに保存しますか？";
      log = "[保存] ";
      action = () => this.pushServer();
    } else return;

    const confirmed = await this.popup.confirm(message);
    if (!confirmed) return;
    await action();
    this.lastUpdate = log + new Date().toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    this.saveLocal();
    window.location.reload();
  }

  switchView(container = null) {
    if (!container) return;
    Object.values(this.containers).forEach((el) => el.classList.add("hide"));
    this.containers[container].classList.remove("hide");
  }

  startStudy(e) {
    e.preventDefault();

    const formData = new FormData(this.ui.setupForm);
    const { range, format } = Object.fromEntries(formData.entries());
    const [start, end] = range.split("-").map(Number);

    const words = this.randomShuffle(this.words.slice(start - 1, end));
    switch (format) {
      case "all":
        this.current.words = words;
        break;
      case "level0": {
        const filtered = Object.values(this.progress).slice(1).flat();
        this.current.words = words.filter((word) => !filtered.includes(word.id));
        break;
      }
      case "level12": {
        const filtered = Object.values(this.progress).slice(1, 3).flat();
        this.current.words = words.filter((word) => filtered.includes(word.id));
        break;
      }
      case "level3": {
        const filtered = this.progress.level3;
        this.current.words = words.filter((word) => filtered.includes(word.id));
        break;
      }
    }
    this.current.index = 0;
    this.current.unknown = [];

    if (this.current.words.length === 0) return;
    this.render();
    this.switchView("study");
  }

  randomShuffle(data) {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[r]] = [shuffled[r], shuffled[i]];
    }
    return shuffled;
  }

  render() {
    this.ui.studyDefinitions.classList.add("hidden");
    this.ui.answerButtonKnown.disabled = true;
    this.ui.answerButtonUnknown.disabled = true;

    const currentWord = this.current.words[this.current.index];
    this.ui.studyProgress.textContent = `${this.current.index + 1} / ${this.current.words.length}`;
    this.ui.studyWordId.textContent = `- ${currentWord.id} -`;
    this.ui.studyWord.textContent = currentWord.word;

    this.ui.studyDefinitions.textContent = "";
    for (const definition of currentWord.definitions) {
      const html = `<div class="study__meaning"><span class="parts">${this.PARTS[definition.parts]}</span><span>${definition.meaning}</span></div>`;
      this.ui.studyDefinitions.insertAdjacentHTML("beforeend", html);
    }

    setTimeout(() => {
      this.ui.studyDefinitions.classList.remove("hidden");
      this.ui.answerButtonKnown.disabled = false;
      this.ui.answerButtonUnknown.disabled = false;
    }, 1500);
  }

  answer(isKnown) {
    const currentId = this.current.words[this.current.index].id;
    if (isKnown) {
      this.levelUpProgress(currentId);
    } else {
      this.current.unknown.push(currentId);
      this.addProgress(currentId, "level0");
    }
    this.saveLocal();
    this.next();
  }

  levelUpProgress(id) {
    for (const [key, val] of Object.entries(this.progress)) {
      if (!val.includes(id)) continue;
      const next = this.generateNextLevelKey(key);
      this.addProgress(id, next);
      return;
    }
    this.addProgress(id, "level1");
  }

  generateNextLevelKey(level) {
    const next = Number(level.at(-1)) + 1;
    return next > 3 ? "level3" : "level" + String(next);
  }

  addProgress(id, level) {
    if (id === undefined || level === undefined || this.progress[level] === undefined) return;
    this.removeProgress(id);
    this.progress[level].push(id);
  }

  removeProgress(id) {
    if (id === undefined) return;
    for (const [key, val] of Object.entries(this.progress)) {
      if (!val.includes(id)) continue;
      this.progress[key].splice(this.progress[key].indexOf(id), 1);
    }
  }

  next() {
    this.current.index++;
    if (this.current.index > this.current.words.length - 1) this.finish();
    else this.render();
  }

  finish() {
    const unknownWords = this.words.filter((word) => this.current.unknown.includes(word.id));
    this.ui.unknownWords.textContent = "";
    for (const word of unknownWords) {
      const definition = word.definitions.map((v) => `[${this.PARTS[v.parts]}]${v.meaning}`).join("　");
      const html = `<div class="result__unknown-word"><div><span class="unknown-word__id">${word.id}</span><span class="unknown-word__word">${word.word}</span></div><div class="unknown-word__meaning">${definition}</div></div>`;
      this.ui.unknownWords.insertAdjacentHTML("beforeend", html);
    }

    this.switchView("result");
    this.current = {};
  }

  openSetting() {
    this.switchView("setting");
    this.ui.resourceWords.textContent = `Only First 10 Words\nAll Words: ${this.words.length}\n\n` + JSON.stringify(this.words.slice(0, 10), null, 2);
    this.ui.resourceProgress.textContent = JSON.stringify(this.progress, null, 2);
    this.ui.lastUpdate.textContent = this.lastUpdate || "なし";
  }
}

const app = new App();
app.init();
