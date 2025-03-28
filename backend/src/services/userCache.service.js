import redis from "../utils/redis.js";

const UserCacheService = {
    async getUserById(userId) {
        const cachedUser = await redis.get(`user:${userId}`);
        return cachedUser ? JSON.parse(cachedUser) : null;
      },
      async getUserByEmail(email) {
        const cachedUser = await redis.get(`user:email:${email}`);
        return cachedUser ? JSON.parse(cachedUser) : null;
      },
      async setUser(user) {
        const userData = JSON.stringify(user);
        await redis.set(`user:${user._id}`, userData, "EX", process.env.CACHE_EXPIRATION);
        await redis.set(`user:email:${user.email}`, userData, "EX", process.env.CACHE_EXPIRATION);
      },
      async deleteUser(user) {
        await redis.del(`user:${user.userId}`);
        await redis.del(`user:email:${user.email}`);
      },
};

export default UserCacheService;
