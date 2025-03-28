import redis from "../utils/redis.js";

const RecipeCacheService = {
  async getRecipe(key) {
    const cachedRecipe = await redis.get(key);
    return cachedRecipe ? JSON.parse(cachedRecipe) : null;
  },
  async setRecipe(key,data) {
    const recipeData = JSON.stringify(data);
    await redis.set(key,recipeData, "EX", process.env.CACHE_EXPIRATION);
  },
};

export default RecipeCacheService
