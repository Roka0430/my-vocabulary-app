export default function handler(req, res) {
  const MY_PASSWORD = process.env.APP_PASSWORD;
  res.status(200).send("<h1>" + MY_PASSWORD + "</h1>");
}
