const cashed = localStorage.getItem("LocalWordsData");
const words = cashed ? JSON.parse(cashed) : [];

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
