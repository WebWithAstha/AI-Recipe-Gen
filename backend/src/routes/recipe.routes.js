import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { generateController , saveRecipeController,getAllSavedRecipeController,getSavedRecipeController, unsaveRecipeController } from '../controllers/reciepe.controllers.js';
import { validateRecipe } from '../middlewares/validateRecipe.js';
const router =  express.Router();

router.post('/generate',isAuthenticated,generateController)
router.post('/save',isAuthenticated,validateRecipe,saveRecipeController)
router.post('/unsave/:id',isAuthenticated,unsaveRecipeController)
router.post('/saved',isAuthenticated,getAllSavedRecipeController)
router.post('/saved/:id',isAuthenticated,getSavedRecipeController)

export default router;