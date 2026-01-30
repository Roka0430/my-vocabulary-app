import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")));

  const token = cookies["login_token"];

  if (token === "success") {
    // 認証OK：publicフォルダのmain.htmlを読み込んで返す
    const filePath = path.join(process.cwd(), "public", "main.html");
    const fileContent = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(fileContent);
  } else {
    return res.redirect(302, "/");
  }
}
