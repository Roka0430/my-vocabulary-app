class StudyApp {
  PARTS = { n: "名", v: "動", adj: "形", adv: "副", prep: "前" };

  constructor(config) {
    this.config = config;
    this.container = document.getElementById("container");
    this.ui = {};
    this.index = 0;
    this.words = [];
  }

  init() {
    const question = document.getElementById("question");
    const templateId = `template_${this.config.format}`;
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);

    const targets = [];
    targets.push(...question.querySelectorAll("[data-target]"));
    targets.push(...clone.querySelectorAll("[data-target]"));
    targets.forEach((el) => (this.ui[el.dataset.target] = el));

    this.container.appendChild(clone);
    this.bindEvents();
    this.loadData();
  }

  async loadData() {
    const res = await fetch(`/api/load?action=range&data=${this.config.range}`);
    const data = await res.json();
    const words = this.config.order == "random" ? this.shuffle(data) : data;
    this.words.push(...words);
    this.render();
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [array[i], array[r]] = [array[r], array[i]];
    }
    return array;
  }
}

class SortStudy extends StudyApp {
  bindEvents() {
    this.ui.means.addEventListener("click", () => this.showMeans(true));
    this.ui.btn_known.addEventListener("click", () => this.answer(true));
    this.ui.btn_unknown.addEventListener("click", () => this.answer(false));
  }

  render() {
    if (this.index == 0) {
      this.ui.btn_known.removeAttribute("disabled");
      this.ui.btn_unknown.removeAttribute("disabled");
    }

    const current = this.words[this.index];
    this.ui.progress_index.textContent = `${this.index + 1} / ${this.words.length}`;
    this.ui.progress_bar.style = `--rate: ${(this.index / this.words.length) * 100}%;`;
    this.ui.word.textContent = current.word;
    this.ui.means.classList.add("hidden");

    this.ui.means.textContent = "";
    for (const [key, mean] of Object.entries(current.means)) {
      const html = `<div class="study-answer__mean"><span class="part">${this.PARTS[key]}</span><span>${mean.join("、")}</span></div>`;
      this.ui.means.insertAdjacentHTML("beforeend", html);
    }
  }

  showMeans() {
    this.ui.means.classList.remove("hidden");
  }

  answer(isKnown) {
    const current = this.words[this.index];
    if (isKnown) {
      current.stats.unknown++;
      current.stats.known = 0;
      current.stats.status = "learning";
      if (current.stats.unknown > 3) {
        current.stats.status = "weak";
      }
    } else {
      current.status.known++;
      if (current.status.known > 3) {
        current.stats.unknown = 0;
        current.stats.status = "mastered";
      }
    }
    this.next();
  }

  next() {
    this.index++;
    if (this.index > this.words.length - 1) this.finish();
    else this.render();
  }

  async finish() {
    await window.location.replace("/result/");
  }
}

class QuizStudy extends StudyApp {
  bindEvents() {}
}

const setup = appStorage.setup.get();
if (setup === null) window.location.replace("/setup/");
else {
  let app;
  switch (setup.format) {
    case "sort":
      app = new SortStudy(setup);
      break;
    case "quiz":
      app = new QuizStudy(setup);
      break;
    default:
      app = null;
      break;
  }
  if (app) app.init();
}
