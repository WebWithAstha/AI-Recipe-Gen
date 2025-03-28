import Redis from "ioredis";

const redis = new Redis({
  host: "redis-18611.c90.us-east-1-3.ec2.redns.redis-cloud.com",
  port: "18611",
  password: "6KtDeABy7Q1VjjRFqMQFzJrQlWWMsn63",
});

redis.on("err", (err) => {
  console.log(err);
});
redis.on("ready", () => {
  console.log("Redis ready!");
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
