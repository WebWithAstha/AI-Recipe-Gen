import { body } from "express-validator";

export const validateRecipeInput = [
  body("ingredients")
    .isArray({ min: 1 }).withMessage("Ingredients must be a non-empty array")
    .custom((items) => items.every((i) => typeof i === "string" && i.trim()))
    .withMessage("Each ingredient must be a string"),

  body("preferences")
    .optional()
    .isArray().withMessage("Preferences must be an array")
    .custom((items) => items.every((i) => typeof i === "string" && i.trim()))
    .withMessage("Each preference must be a string"),

  body("cuisineType")
    .optional()
    .isString().withMessage("Cuisine must be a string")
    .isLength({ min: 0, max: 30 }).withMessage("Cuisine: 2-30 chars")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Cuisine: letters only")
];
