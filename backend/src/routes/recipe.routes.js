import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { generateController } from '../controllers/reciepe.controllers.js';
const router =  express.Router();

router.post('/generate',isAuthenticated,generateController)


export default router;