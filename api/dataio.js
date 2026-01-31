import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const filename = path.join(process.cwd(), "resource", "vocabulary.csv");
    const contents = await fs.readFile(filename, "utf8");

    const json = [];
    for (const lien of contents.split("\n").filter(Boolean)) {
      const splitted = lien.split(",");
      const addition = {
        id: Number(splitted[0]),
        word: splitted[1],
        mean: splitted.slice(2),
      };
      json.push(addition);
    }

    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ error: "ファイルの読み取りに失敗しました。" });
  }
}
