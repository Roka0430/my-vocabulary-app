const initStudySetup = async () => {
  const studyRangeSelect = document.getElementById("studyRangeSelect");
  const submitButton = document.getElementById("submitButton");
  const RANGE_SIZE = 50;

  try {
    const res = await fetch("/api/dataio?length=true");
    if (!res.ok) throw new Error("データの取得に失敗しました");

    const length = await res.json();
    const totalGroups = Math.ceil(length.len / RANGE_SIZE);

    const fragment = document.createDocumentFragment();
    studyRangeSelect.textContent = "";

    for (let i = 0; i < totalGroups; i++) {
      const startNo = i * RANGE_SIZE + 1;
      const endNo = Math.min((i + 1) * RANGE_SIZE, length.len);

      const option = document.createElement("option");
      option.value = `${startNo}-${endNo}`;
      option.textContent = `No.${startNo} - ${endNo}`;
      fragment.appendChild(option);
    }

    studyRangeSelect.appendChild(fragment);
    studyRangeSelect.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
  } catch (error) {
    console.error("エラー:", error);
  }
};

document.addEventListener("DOMContentLoaded", initStudySetup);
