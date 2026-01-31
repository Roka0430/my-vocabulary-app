class VocabularyClass {
  PARTS = { n: "名", v: "動", adj: "形", adv: "副", prep: "前" };

  constructor(elements) {
    this.elements = elements;
    this.init();

    this.elements.means.addEventListener("click", () => this.openMeans());
  }

  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    this.range = urlParams.get("range");
    this.format = urlParams.get("format");

    if (this.format == "quiz") this.elements.formatQuiz.classList.remove("hide");
    else this.elements.formatSort.classList.remove("hide");

    this.words = await this.loadData();
    this.index = 0;

    this.setWord();
  }

  async loadData() {
    try {
      const res = await fetch(`/api/dataio?startend=${this.range}`);
      if (!res.ok) throw new Error("データの取得に失敗しました");
      return await res.json();
    } catch (error) {
      console.error("エラー:", error);
    }
  }

  setWord() {
    const current = this.words[this.index];
    this.elements.progressIndex.textContent = `${this.index + 1} / ${this.words.length}`;
    this.elements.progressBar.style = `--rate: ${(this.index / this.words.length) * 100}%`;
    this.elements.word.textContent = current.word;

    this.elements.means.classList.add("hidden");
    this.elements.means.textContent = "";
    for (const [part, mean] of Object.entries(current.means)) {
      const html = `<div class="study-answer__mean"><span>${this.PARTS[part]}</span>${mean}</div>`;
      this.elements.means.insertAdjacentHTML("beforeend", html);
    }
  }

  openMeans() {
    this.elements.means.classList.remove("hidden");
  }
}

const elements = {
  progressIndex: document.getElementById("progressIndex"),
  progressBar: document.getElementById("progressBar"),
  word: document.getElementById("word"),
  formatQuiz: document.getElementById("formatQuiz"),
  formatSort: document.getElementById("formatSort"),
  means: document.getElementById("means"),
};

const vc = new VocabularyClass(elements);
