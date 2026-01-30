export default function handler(req, res) {
  const { pass } = req.query;
  if (pass == process.env.APP_PASSWORD) {
    return res.status(200).send("<h1>認証成功</h1>");
  }
}
