import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Recipe from "../models/recipe.model.js";
import { generateRecipe } from "../services/gemini.service.js";
import RecipeCacheService from "../services/recipeCache.service.js";
import ResponseHandler from "../utils/response.handler.js";
import { validationResult } from "express-validator";

export const generateController = catchAsyncErrors(async (req, res, next) => {
  const { ingredients, preferences, cuisineType } = req.body;
  if (!ingredients) {
    return ResponseHandler.error(400, "Missing required fields").send(res);
  }
  const cacheKey = `recipe:${[...ingredients].sort().join(",")}:${cuisineType}:${Array.isArray(preferences) ? preferences.join(",") : ""}`;
  const cachedRecipe = await RecipeCacheService.getRecipe(cacheKey);
  if (cachedRecipe) {
    return ResponseHandler.success(cachedRecipe).send(res);
  }
  const recipe = await generateRecipe(ingredients, preferences, cuisineType);

  if (recipe.error) {
    return ResponseHandler.error(
      500,
      "Error generating recipe",
      recipe.error
    ).send(res);
  }
  RecipeCacheService.setRecipe(cacheKey, recipe);
  ResponseHandler.success(recipe, "recipe generated successfully").send(res);
});

export const saveRecipeController = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return ResponseHandler.error(404,{errors: errors.array()}).send(res);
  const {
    title,
    ingredients,
    mainIngredients,
    instructions,
    cuisine,
    preferences,
    originalQuery,
  } = req.body;
  const userId = req.user.id;

  const existingRecipe = await Recipe.findOne({
    userId,
    title,
    mainIngredients,
  });
  if (existingRecipe) {
    return ResponseHandler.error(409, "Recipe already exists").send(res);
  }
  const recipe = await new Recipe({
    userId,
    title,
    mainIngredients,
    ingredients,
    instructions,
    cuisine: cuisine || "General",
    preferences: preferences || [],
    source: "gemini",
    originalQuery: originalQuery || "",
  }).save();

  ResponseHandler.success(recipe, "Recipe saved successfully").send(res);
});

export const getAllSavedRecipeController = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user.id;
    const savedRecipes = await Recipe.find({ userId });
    if (!savedRecipes) {
      return ResponseHandler.error(404, "No saved recipes").send(res);
    }
    ResponseHandler.success(savedRecipes).send(res);
  
})
export const getSavedRecipeController = catchAsyncErrors(async (req, res, next) => {
    const savedRecipe = await Recipe.findById(req.params.id);
    if (!savedRecipe) {
      return ResponseHandler.error(404, "Recipe not found").send(res);
    }
    ResponseHandler.success(savedRecipe).send(res);
  
})
