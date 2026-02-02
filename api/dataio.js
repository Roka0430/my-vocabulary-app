import { Redis } from "@upstash/redis";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { action, payload } = req.body;
  try {
    const redis = Redis.fromEnv();
    switch (action) {
      case "load":
        const data = await redis.get("my_progress");
        return res.status(200).json(data || []);
      case "save":
        if (!payload) return res.status(400).json({ message: "Invalid Syntax" });
        await redis.set("my_progress", payload);
        return res.status(204).end();
      default:
        return res.status(400).json({ message: "Invalid Syntax" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
