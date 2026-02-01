class AppStorage {
  constructor(key) {
    this.key = key;
  }

  get() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  set(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}

class DataManager {
  constructor() {
    this.wordsStorage = new AppStorage("UserVocabularyData");
    this.progressStorage = new AppStorage("UserProgressData");
  }

  async fetchWords() {
    const cached = this.wordsStorage.get();
    if (cached) return cached;
    const res = await fetch("/resource/vocabulary.json");
    const data = await res.json();
    this.wordsStorage.set(data);
    console.log("fetchWords");
    return data;
  }

  async fetchProgress(forceRead = false) {
    const cached = this.progressStorage.get();
    if (!forceRead && cached) return cached;
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "load" }),
    });
    const data = await res.json();
    this.progressStorage.set(data);
    console.log("fetchProgress");
    return data;
  }

  async saveProgress(progress) {
    this.progressStorage.set(progress);
    return fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save", payload: progress }),
    });
  }
}

class MyVocabularyApp {
  PARTS = { noun: "名", verb: "動", adjective: "形", adverb: "副", preposition: "前" };

  constructor() {
    this.manager = new DataManager();
    this.words = [];
    this.progress = null;
    this.ui = {};
  }

  async init() {
    const [words, progress] = await Promise.all([this.manager.fetchWords(), this.manager.fetchProgress()]);
    this.words = words;
    this.progress = progress;
    this.current = {};

    this.setElements();
    this.bindEvents();
    this.switchView();
    // this.switchView("study");
    this.ui.setupForm.classList.remove("disable");
  }

  setElements() {
    [...document.querySelectorAll("[data-target]")].forEach((el) => (this.ui[el.dataset.target] = el));
  }

  bindEvents() {
    let timeout1, timeout2;
    this.ui.settingReadDB.addEventListener("click", () => {
      switch (this.ui.settingReadDB.dataset.index) {
        case "0":
          this.ui.settingReadDB.textContent = "データベースから読み出し、本当にいいの？";
          this.ui.settingReadDB.dataset.index = "1";
          break;
        case "1":
          this.ui.settingReadDB.textContent = "データベースから読み出し、本当にいいの？ほんとに？";
          this.ui.settingReadDB.dataset.index = "2";
          break;
        case "2":
          this.ui.settingReadDB.textContent = "Run";
          this.ui.settingReadDB.dataset.index = "3";
          break;
        case "3":
          this.ui.settingReadDB.textContent = "データベースから読み出し";
          this.ui.settingReadDB.dataset.index = "0";
          this.manager.fetchProgress(true);
          break;
      }
      if (timeout1) clearTimeout(timeout1);
      timeout1 = setTimeout(() => {
        this.ui.settingReadDB.textContent = "データベースから読み出し";
        this.ui.settingReadDB.dataset.index = "0";
      }, 1000);
    });
    this.ui.settingWriteDB.addEventListener("click", () => {
      switch (this.ui.settingWriteDB.dataset.index) {
        case "0":
          this.ui.settingWriteDB.textContent = "データベースを上書き、本当にいいの？";
          this.ui.settingWriteDB.dataset.index = "1";
          break;
        case "1":
          this.ui.settingWriteDB.textContent = "データベースを上書き、本当にいいの？ほんとに？";
          this.ui.settingWriteDB.dataset.index = "2";
          break;
        case "2":
          this.ui.settingWriteDB.textContent = "Run";
          this.ui.settingWriteDB.dataset.index = "3";
          break;
        case "3":
          this.ui.settingWriteDB.textContent = "データベースを上書き";
          this.ui.settingWriteDB.dataset.index = "0";
          this.manager.saveProgress(this.progress);
          break;
      }
      if (timeout1) clearTimeout(timeout1);
      timeout1 = setTimeout(() => {
        this.ui.settingWriteDB.textContent = "データベースを上書き";
        this.ui.settingWriteDB.dataset.index = "0";
      }, 1000);
    });
    this.ui.realTimeData.addEventListener("click", () => {
      this.ui.container.textContent = "";
      const html = `<textarea style="width: 100%; height: 100%">${JSON.stringify(this.progress, null, 2)}</textarea>`;
      this.ui.container.insertAdjacentHTML("beforeend", html);
    });

    this.ui.setupForm.addEventListener("submit", (e) => this.submitSetup(e));
    this.ui.sortOptionKnown.addEventListener("click", () => this.answer(true));
    this.ui.sortOptionUnknown.addEventListener("click", () => this.answer(false));
  }

  switchView(view = "setup") {
    [...document.getElementsByClassName("wrapper")].forEach((el) => el.classList.add("hide"));
    document.getElementById(view).classList.remove("hide");
  }

  randomShuffle(data) {
    for (let i = data.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [data[i], data[r]] = [data[r], data[i]];
    }
    return data;
  }

  submitSetup(e) {
    e.preventDefault();

    const formData = new FormData(this.ui.setupForm);
    const config = Object.fromEntries(formData.entries());

    const [start, end] = config.range.split("-").map(Number);
    const targetWords = this.words.slice(start - 1, end);
    this.current.words = config.order == "random" ? this.randomShuffle(targetWords) : targetWords;
    this.current.index = 0;
    this.current.format = config.format;

    const studyAnswerKeys = Object.keys(this.ui).filter((key) => key.startsWith("studyAnswer"));
    studyAnswerKeys.forEach((key) => this.ui[key].classList.add("hide"));
    this.ui[`studyAnswer_${this.current.format}`].classList.remove("hide");

    this.render();
    this.switchView("study");
  }

  render() {
    const currentWord = this.current.words[this.current.index];
    this.ui.progressIndex.textContent = `${this.current.index + 1} / ${this.current.words.length}`;
    this.ui.progressBar.style = `--rate: ${(this.current.index / this.current.words.length) * 100}%`;
    this.ui.word.textContent = currentWord.word;

    this.ui.studyAnswer_sort.classList.add("disable");
    this.ui.definitions.textContent = "";
    for (const definition of currentWord.definitions) {
      const html = `<div class="study-answer__meaning"><span class="parts">${this.PARTS[definition.parts]}</span><span>${definition.meaning}</span></div>`;
      this.ui.definitions.insertAdjacentHTML("beforeend", html);
    }

    setTimeout(() => this.ui.studyAnswer_sort.classList.remove("disable"), 1500);
  }

  answer(isKnown) {
    const id = this.current.words[this.current.index].id;
    if (isKnown) {
      if (this.progress.weak.includes(id)) {
        this.progress.weak.splice(this.progress.weak.indexOf(id), 1);
        this.progress.learning.push(id);
      } else if (this.progress.learning.includes(id)) {
        this.progress.learning.splice(this.progress.learning.indexOf(id), 1);
        this.progress.mastered.push(id);
      } else {
        this.progress.learning.push(id);
      }
    } else {
      if (!this.progress.weak.includes(id)) {
        if (this.progress.learning.includes(id)) this.progress.learning.splice(this.progress.learning.indexOf(id), 1);
        if (this.progress.mastered.includes(id)) this.progress.mastered.splice(this.progress.mastered.indexOf(id), 1);
        this.progress.weak.push(id);
      }
    }

    this.next();
  }

  next() {
    this.current.index++;
    if (this.current.index > this.current.words.length - 1) this.finish();
    else this.render();
  }

  finish() {
    this.manager.saveProgress(this.progress);
    this.switchView("result");
  }
}

const app = new MyVocabularyApp();
app.init();
