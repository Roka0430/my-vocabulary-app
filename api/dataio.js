import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const filename = path.join(process.cwd(), "resource", "vocabulary.csv");
    const contents = await fs.readFile(filename, "utf8");
    res.status(200).send(contents);
  } catch (error) {
    res.status(500).send("ファイルの読み込みに失敗しました。");
  }
}
