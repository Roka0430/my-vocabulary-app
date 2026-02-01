import { kv } from "@vercel/kv";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  // GETリクエストでアクセスしたときに実行
  if (req.method !== "GET") return res.status(405).end();

  try {
    // 1. ローカルのJSONを読み込む
    const filename = path.join(process.cwd(), "resource", "vocabulary.json");
    const contents = await fs.readFile(filename, "utf8");
    const data = JSON.parse(contents);

    // 2. KVに保存 (キー名を "all_vocab" にします)
    await kv.set("all_vocab", data);

    res.status(200).json({ message: "Migration successful!", key: "all_vocab" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
