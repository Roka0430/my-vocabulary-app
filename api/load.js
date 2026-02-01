import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const filename = path.join(process.cwd(), "resource", "vocabulary.json");
    const contents = await fs.readFile(filename, "utf8");

    const { action, data } = req.query;
    switch (action) {
      case "range":
        const [start, end] = data.split("-");
        res.status(200).json(JSON.parse(contents).slice(start - 1, end));
        break;
      case "length":
        res.status(200).json({ len: JSON.parse(contents).length });
        break;
      default:
        res.status(200).json(JSON.parse(contents));
        break;
    }
  } catch (error) {
    res.status(500).json({ error: "ファイルの読み取りに失敗しました。" });
  }
}
