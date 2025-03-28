import { body } from "express-validator";

export const validateRecipe = [
  // body("userId")
  //   .notEmpty()
  //   .withMessage("User ID is required")
  //   .isMongoId()
  //   .withMessage("Invalid User ID format"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .trim(),

  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("At least one ingredient is required"),

  body("instructions")
    .isArray({ min: 1 })
    .withMessage("At least one instruction is required"),

  body("preferences")
    .optional()
    .isArray()
    .withMessage("Preferences must be an array of strings"),

  body("cuisine").optional().isString().withMessage("Cuisine must be a string"),

  body("source").optional().isString().withMessage("Source must be a string"),

  // body("originalQuery")
  //   .notEmpty()
  //   .withMessage("Original query is required")
  //   .trim(),
];
