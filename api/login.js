export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Found");
  }

  const { pass } = req.body;
  if (pass === process.env.APP_PASSWORD) {
    res.redirect(302, "/main.html");
  } else {
    res.redirect(302, "/?error=1");
  }
}
