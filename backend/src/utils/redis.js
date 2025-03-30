import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});
redis.on("connect", () => {
  console.log("Redis connected!");
});
redis.on("close", () => {
  console.log("Redis connection closed!");
});
redis.on("reconnecting", () => {
  console.log("Redis reconnecting!");
});
redis.on("end", () => {
  console.log("Redis connection ended!");
});

export default redis;
