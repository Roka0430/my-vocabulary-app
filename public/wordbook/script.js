const cashed = localStorage.getItem("LocalWordsData");
const words = cashed ? JSON.parse(cashed) : [];

const coverEl = document.getElementById("cover");
const wordbookTbodyEl = document.getElementById("wordbookTbody");
const wordbookTemplateEl = document.getElementById("wordbookTemplate");

const PARTS = { noun: "名", verb: "動", adjective: "形", adverb: "副", preposition: "前" };
for (const word of words) {
  const elements = {};
  const clone = wordbookTemplateEl.content.cloneNode(true);
  [...clone.querySelectorAll("[data-target]")].forEach((el) => (elements[el.dataset.target] = el));

  elements.id.textContent = word.id;
  elements.word.textContent = word.word;

  for (const definition of word.definitions) {
    const html = `<div class="wordbook-table__meaning"><div class="wordbook-table__parts">${PARTS[definition.parts]}</div><div>${definition.meaning}</div></div>`;
    elements.definitions.insertAdjacentHTML("beforeend", html);
  }

  wordbookTbodyEl.appendChild(clone);
}

const openCover = () => {
  if (coverEl.classList.contains("visible")) {
    coverEl.classList.remove("visible");
    return;
  }
  const definitions = document.getElementsByClassName("wordbook-table__definitions");
  if (definitions.length === 0) return;
  const definition = definitions[0];
  const width = definition.clientWidth;
  coverEl.style = `width: ${width}px;`;
  coverEl.classList.add("visible");
};
