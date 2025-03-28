import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { generateController , saveRecipeController,getAllSavedRecipeController,getSavedRecipeController } from '../controllers/reciepe.controllers.js';
const router =  express.Router();

router.post('/generate',isAuthenticated,generateController)
router.post('/save',isAuthenticated,saveRecipeController)
router.post('/saved',isAuthenticated,getAllSavedRecipeController)
router.post('/saved/:id',isAuthenticated,getSavedRecipeController)

export default router;