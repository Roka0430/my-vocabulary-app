const TEST_DATA = [
  {
    id: 1,
    word: "anyway",
    mean: ["", "", "", "とにかく", ""],
  },
  {
    id: 2,
    word: "following",
    mean: ["", "", "次の、以下の", "", "～に続いて"],
  },
  {
    id: 3,
    word: "refer",
    mean: ["", "参照する、言及する、（人を）紹介する", "", "", ""],
  },
  {
    id: 4,
    word: "available",
    mean: ["", "", "入手できる、利用できる、購入できる、手が空いている", "", ""],
  },
  {
    id: 5,
    word: "department",
    mean: ["部門、売り場", "", "", "", ""],
  },
  {
    id: 6,
    word: "conference",
    mean: ["会議", "", "", "", ""],
  },
  {
    id: 7,
    word: "according to",
    mean: ["", "", "", "", "～によると、～に従って"],
  },
  {
    id: 8,
    word: "likely",
    mean: ["", "", "～しそうだ", "おそらく", ""],
  },
  {
    id: 9,
    word: "offer",
    mean: ["申し出、オファー", "申し出る、提供する", "", "", ""],
  },
  {
    id: 10,
    word: "equipment",
    mean: ["機器、装備", "", "", "", ""],
  },
  {
    id: 11,
    word: "provide",
    mean: ["", "提供する", "", "", ""],
  },
  {
    id: 12,
    word: "local",
    mean: ["地元の人", "", "地元の", "", ""],
  },
  {
    id: 13,
    word: "purchase",
    mean: ["購入品", "購入する", "", "", ""],
  },
  {
    id: 14,
    word: "opening",
    mean: ["空き、開店", "", "", "", ""],
  },
  {
    id: 15,
    word: "construction",
    mean: ["建設", "", "", "", ""],
  },
  {
    id: 16,
    word: "tour",
    mean: ["見学、旅行", "見学する、旅行する", "", "", ""],
  },
  {
    id: 17,
    word: "research",
    mean: ["研究、調査", "研究する、調査する", "", "", ""],
  },
  {
    id: 18,
    word: "attend",
    mean: ["", "出席する、参加する", "", "", ""],
  },
  {
    id: 19,
    word: "delivery",
    mean: ["配達（物）", "", "", "", ""],
  },
  {
    id: 20,
    word: "recently",
    mean: ["", "", "", "最近", ""],
  },
  {
    id: 21,
    word: "indicate",
    mean: ["", "示す", "", "", ""],
  },
  {
    id: 22,
    word: "employee",
    mean: ["社員、従業員", "", "", "", ""],
  },
  {
    id: 23,
    word: "additional",
    mean: ["", "", "追加の", "", ""],
  },
  {
    id: 24,
    word: "survey",
    mean: ["アンケート調査", "アンケート調査を行う", "", "", ""],
  },
  {
    id: 25,
    word: "review",
    mean: ["検討、論評", "検討する、論評する", "", "", ""],
  },
  {
    id: 26,
    word: "production",
    mean: ["生産、作品", "", "", "", ""],
  },
  {
    id: 27,
    word: "located",
    mean: ["", "", "位置して", "", ""],
  },
  {
    id: 28,
    word: "detail",
    mean: ["詳細", "詳しく述べる", "", "", ""],
  },
  {
    id: 29,
    word: "announce",
    mean: ["", "発表する", "", "", ""],
  },
  {
    id: 30,
    word: "repair",
    mean: ["修理", "修理する", "", "", ""],
  },
  {
    id: 31,
    word: "increase",
    mean: ["増加", "増える、増やす", "", "", ""],
  },
  {
    id: 32,
    word: "include",
    mean: ["", "含む", "", "", ""],
  },
  {
    id: 33,
    word: "currently",
    mean: ["", "", "", "現在", ""],
  },
  {
    id: 34,
    word: "advertising",
    mean: ["広告（業）、宣伝（活動）", "", "", "", ""],
  },
  {
    id: 35,
    word: "charge",
    mean: ["料金、責任", "請求する", "", "", ""],
  },
  {
    id: 36,
    word: "expect",
    mean: ["", "予期する、予定する", "", "", ""],
  },
  {
    id: 37,
    word: "firm",
    mean: ["会社", "", "", "", ""],
  },
  {
    id: 38,
    word: "client",
    mean: ["顧客、クライアント", "", "", "", ""],
  },
  {
    id: 39,
    word: "financial",
    mean: ["", "", "お金の、財務の、金融の", "", ""],
  },
  {
    id: 40,
    word: "annual",
    mean: ["", "", "年の1度の、毎年恒例の、年間の", "", ""],
  },
  {
    id: 41,
    word: "payment",
    mean: ["支払い", "", "", "", ""],
  },
  {
    id: 42,
    word: "budget",
    mean: ["予算", "予算に計上する", "", "", ""],
  },
  {
    id: 43,
    word: "application",
    mean: ["応募用紙、応募、申請", "", "", "", ""],
  },
  {
    id: 44,
    word: "contract",
    mean: ["契約（書）", "", "", "", ""],
  },
  {
    id: 45,
    word: "management",
    mean: ["経営（陣）、管理", "", "", "", ""],
  },
  {
    id: 46,
    word: "performance",
    mean: ["業績、仕事ぶり、性能、公演", "", "", "", ""],
  },
  {
    id: 47,
    word: "pleased",
    mean: ["", "", "喜んで、満足して", "", ""],
  },
  {
    id: 48,
    word: "confirm",
    mean: ["", "確認する", "", "", ""],
  },
  {
    id: 49,
    word: "award",
    mean: ["賞", "授与する", "", "", ""],
  },
  {
    id: 50,
    word: "clothing",
    mean: ["衣類", "", "", "", ""],
  },
  {
    id: 51,
    word: "display",
    mean: ["展示", "展示する", "", "", ""],
  },
  {
    id: 52,
    word: "candidate",
    mean: ["候補者", "", "", "", ""],
  },
  {
    id: 53,
    word: "state",
    mean: ["", "述べる", "", "", ""],
  },
  {
    id: 54,
    word: "exhibit",
    mean: ["展示物、展示会", "展示する", "", "", ""],
  },
  {
    id: 55,
    word: "session",
    mean: ["時間、集まり", "", "", "", ""],
  },
  {
    id: 56,
    word: "note",
    mean: ["メモ", "注意する、述べる", "", "", ""],
  },
  {
    id: 57,
    word: "process",
    mean: ["プロセス、過程、処理", "処理する", "", "", ""],
  },
  {
    id: 58,
    word: "instruction",
    mean: ["説明書、説明、指示", "", "", "", ""],
  },
  {
    id: 59,
    word: "membership",
    mean: ["会員（であること）、会員資格、会員数", "", "", "", ""],
  },
  {
    id: 60,
    word: "agency",
    mean: ["代理店、機関", "", "", "", ""],
  },
  {
    id: 61,
    word: "based",
    mean: ["", "", "拠点のある、基づく", "", ""],
  },
  {
    id: 62,
    word: "facility",
    mean: ["施設", "", "", "", ""],
  },
  {
    id: 63,
    word: "advance",
    mean: ["進歩、前進", "", "先行した、事前の", "", ""],
  },
  {
    id: 64,
    word: "committee",
    mean: ["委員会", "", "", "", ""],
  },
  {
    id: 65,
    word: "successful",
    mean: ["", "", "成功した、うまくいく", "", ""],
  },
  {
    id: 66,
    word: "excellent",
    mean: ["", "", "素晴らしい", "", ""],
  },
  {
    id: 67,
    word: "industry",
    mean: ["産業、業界", "", "", "", ""],
  },
  {
    id: 68,
    word: "fee",
    mean: ["料金", "", "", "", ""],
  },
  {
    id: 69,
    word: "accept",
    mean: ["", "受け入れる", "", "", ""],
  },
  {
    id: 70,
    word: "upcoming",
    mean: ["", "", "今度の", "", ""],
  },
  {
    id: 71,
    word: "latest",
    mean: ["", "", "最新の", "", ""],
  },
  {
    id: 72,
    word: "submit",
    mean: ["", "提出する", "", "", ""],
  },
  {
    id: 73,
    word: "transportation",
    mean: ["輸送手段", "", "", "", ""],
  },
  {
    id: 74,
    word: "resume",
    mean: ["履歴書", "", "", "", ""],
  },
  {
    id: 75,
    word: "executive",
    mean: ["重役", "", "重役（用）の、高級な", "", ""],
  },
  {
    id: 76,
    word: "introduce",
    mean: ["", "導入する、紹介する", "", "", ""],
  },
  {
    id: 77,
    word: "previous",
    mean: ["", "", "前の、以前の", "", ""],
  },
  {
    id: 78,
    word: "proposal",
    mean: ["提案、提案書", "", "", "", ""],
  },
  {
    id: 79,
    word: "supply",
    mean: ["必需品", "供給する", "", "", ""],
  },
  {
    id: 80,
    word: "enclose",
    mean: ["", "同封する、囲む", "", "", ""],
  },
  {
    id: 81,
    word: "policy",
    mean: ["規定、方針", "", "", "", ""],
  },
  {
    id: 82,
    word: "register",
    mean: ["レジ", "登録する", "", "", ""],
  },
  {
    id: 83,
    word: "arrange",
    mean: ["", "手配する、並べる", "", "", ""],
  },
  {
    id: 84,
    word: "bill",
    mean: ["請求書", "請求書を送る", "", "", ""],
  },
  {
    id: 85,
    word: "hire",
    mean: ["", "雇う", "", "", ""],
  },
  {
    id: 86,
    word: "approve",
    mean: ["", "承認する、賛成する", "", "", ""],
  },
  {
    id: 87,
    word: "conduct",
    mean: ["", "実行する、実施する", "", "", ""],
  },
  {
    id: 88,
    word: "opportunity",
    mean: ["機会、チャンス", "", "", "", ""],
  },
  {
    id: 89,
    word: "deadline",
    mean: ["締め切り、期限", "", "", "", ""],
  },
  {
    id: 90,
    word: "corporate",
    mean: ["", "", "企業の、法人の", "", ""],
  },
  {
    id: 91,
    word: "warranty",
    mean: ["保障、保証書", "", "", "", ""],
  },
  {
    id: 92,
    word: "necessary",
    mean: ["", "", "必要な", "", ""],
  },
  {
    id: 93,
    word: "reserve",
    mean: ["蓄え", "予約する、確保する", "", "", ""],
  },
  {
    id: 94,
    word: "resident",
    mean: ["住民、住人", "", "", "", ""],
  },
  {
    id: 95,
    word: "create",
    mean: ["", "創造する、作り出す", "", "", ""],
  },
  {
    id: 96,
    word: "inform",
    mean: ["", "知らせる、影響を与える", "", "", ""],
  },
  {
    id: 97,
    word: "allow",
    mean: ["", "許す、可能にする", "", "", ""],
  },
  {
    id: 98,
    word: "mention",
    mean: ["言及", "述べる、言及する", "", "", ""],
  },
  {
    id: 99,
    word: "appreciate",
    mean: ["", "感謝する", "", "", ""],
  },
  {
    id: 100,
    word: "replacement",
    mean: ["交換、交換品、後任", "", "", "", ""],
  },
];

class ToeicVocabularyClass {
  constructor() {
    this.init();
    console.log(this.data);
  }

  async init() {
    // this.data = await this.loadData();
    this.data = TEST_DATA;
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

window.addEventListener("click", () => {
  console.log(speechSynthesis.getVoices());

  const uttr = new SpeechSynthesisUtterance();
  uttr.text = "eat";
  uttr.lang = "en-GB";
  uttr.volume = 1.0;
  uttr.late = 1.0;
  uttr.pitch = 1.0;
  window.speechSynthesis.speak(uttr);
});
