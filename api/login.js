export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { pass } = req.body;
  if (pass === process.env.APP_PASSWORD) {
    res.setHeader("Set-Cookie", "login_token=success; Path=/; Max-Age=86400; HttpOnly; SameSite=Strict");
    res.redirect(302, "/main.html");
  } else if (pass === "") {
    res.redirect(302, "/?error=empty");
  } else {
    res.redirect(302, "/?error=wrong");
  }
}
