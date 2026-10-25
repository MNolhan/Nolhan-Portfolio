import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Erreur:", err);
});

export async function ensureRedisConnected() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis Connecté");
  }
}

export default redisClient;
