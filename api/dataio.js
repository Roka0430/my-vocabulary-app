import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const filename = path.join(process.cwd(), "resource", "vocabulary.json");
    const contents = await fs.readFile(filename, "utf8");
    res.status(200).json(JSON.parse(contents));
  } catch (error) {
    res.status(500).json({ error: "ファイルの読み取りに失敗しました。" });
  }
}
