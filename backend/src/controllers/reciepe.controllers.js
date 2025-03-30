import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Recipe from "../models/recipe.model.js";
import { generateRecipe } from "../services/gemini.service.js";
import RecipeCacheService from "../services/recipeCache.service.js";
import ResponseHandler from "../utils/response.handler.js";
import { validationResult } from "express-validator";

export const generateController = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return ResponseHandler.error(404, { errors: errors.array() }).send(res);
  const { ingredients, preferences, cuisineType, regenerate } = req.body;
  if (!ingredients) {
    return ResponseHandler.error(400, "Missing required fields").send(res);
  }
  const cacheKey = `recipe:${[...ingredients]
    .sort()
    .join(",")}:${cuisineType}:${
    Array.isArray(preferences) ? preferences.join(",") : ""
  }`;
  if (!regenerate) {
    const cachedRecipe = await RecipeCacheService.getRecipe(cacheKey);
    if (cachedRecipe) {
      return ResponseHandler.success(cachedRecipe).send(res);
    }
  }
  console.log("generating fresh recipe");
  const recipe = await generateRecipe(ingredients, preferences, cuisineType);

  if (recipe.error) {
    return ResponseHandler.error(500, recipe.error, recipe.error).send(res);
  }
  RecipeCacheService.setRecipe(cacheKey, recipe);
  ResponseHandler.success(recipe, "recipe generated successfully").send(res);
});

export const saveRecipeController = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return ResponseHandler.error(404, { errors: errors.array() }).send(res);
  const {
    title,
    ingredients,
    mainIngredients,
    instructions,
    cuisine,
    preferences,
    originalQuery,
    imageUrl,
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
    imageUrl:
      imageUrl ||
      "https://img.freepik.com/premium-photo/raw-ingredients-cooking-spaghetti-marinara-with-poached-eggs-flat-lay-copy-spaces_63762-248.jpg?semt=ais_hybrid",
  }).save();

  ResponseHandler.success(recipe, "Recipe saved successfully").send(res);
});

export const getAllSavedRecipeController = catchAsyncErrors(
  async (req, res, next) => {
    const userId = req.user.id;
    const savedRecipes = await Recipe.find({ userId });
    if (!savedRecipes) {
      return ResponseHandler.error(404, "No saved recipes").send(res);
    }
    ResponseHandler.success(savedRecipes).send(res);
  }
);

export const getSavedRecipeController = catchAsyncErrors(
  async (req, res, next) => {
    const savedRecipe = await Recipe.findById(req.params.id);
    if (!savedRecipe) {
      return ResponseHandler.error(404, "Recipe not found").send(res);
    }
    ResponseHandler.success(savedRecipe).send(res);
  }
);
export const unsaveRecipeController = catchAsyncErrors(
  async (req, res, next) => {
    const recipeId = req.params.id;
    const userId = req.user.id;
    const recipe = await Recipe.findOneAndDelete({ _id: recipeId, userId });
    if (!recipe) {
      return ResponseHandler.error(
        404,
        "Recipe not found or not owned by user"
      ).send(res);
    }
    ResponseHandler.success({}, "Recipe unsaved successfully").send(res);
  }
);
