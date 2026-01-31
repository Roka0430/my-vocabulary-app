import { promises as fs } from "fs";
import path from "path";

export default async function handler(request, response) {
  const resourceDir = path.join(process.cwd(), "resource");
  const fileContents = await fs.readFile(resourceDir + "/data.json", "utf8");
  response.status(200).json(JSON.parse(fileContents));
}
