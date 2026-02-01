import { Redis } from "@upstash/redis";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { action, payload } = req.body;

  try {
    const redis = Redis.fromEnv();
    switch (action) {
      case "load":
        const progress = await redis.get("my_progress");
        res.status(200).json(progress);
        break;
      case "save":
        await redis.set("my_progress", payload);
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
