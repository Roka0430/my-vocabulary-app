import { kv } from "@vercel/kv";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const filename = path.join(process.cwd(), "resource", "vocabulary.json");
    const contents = await fs.readFile(filename, "utf8");
    const data = JSON.parse(contents);
    await kv.set("my_vocabulary", data);
    res.status(200).send("移行完了！");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
