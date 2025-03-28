import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { generateRecipe } from "../services/gemini.service.js";
import RecipeCacheService from "../services/recipeCache.service.js";
import ResponseHandler from "../utils/response.handler.js";

export const generateController =  catchAsyncErrors(async (req,res,next)=>{
    const { ingredients, preferences, cuisineType } = req.body;
    if (!ingredients ||!preferences ||!cuisineType) {
        return ResponseHandler.error(400, "Missing required fields").send(res);
      }
    const cacheKey = `recipe:${ingredients.join(",")}:${preferences}:${cuisineType}`;
    const cachedRecipe = await RecipeCacheService.getRecipe(cacheKey);
      if (cachedRecipe) {
        return ResponseHandler.success(cachedRecipe).send(res);
      }
      const recipe = await generateRecipe(ingredients, preferences, cuisineType);

      if (recipe.error) {
        return ResponseHandler.error(500,"Error generating recipe",recipe.error).send(res);
      }
      RecipeCacheService.setRecipe(cacheKey, recipe); 
      ResponseHandler.success(recipe,"recipe generated successfully").send(res); 
})