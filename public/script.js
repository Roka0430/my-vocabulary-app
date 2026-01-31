class ToeicVocabularyClass {
  constructor() {
    this.init();
  }

  async init() {
    const data = await this.loadData();
    console.log(data);
  }

  async loadData() {
    try {
      const res = await fetch("/api/dataio");
      if (!res.ok) throw new Error("データの取得に失敗しました");
      return await res.json();
    } catch (error) {
      console.error("エラー:", error);
    }
  }
}

const tvc = new ToeicVocabularyClass();
