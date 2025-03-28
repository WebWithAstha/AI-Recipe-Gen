import express from "express";
import { registerController, loginController, logoutController, currentUserController } from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.post('/logout',logoutController);
router.post('/',isAuthenticated, currentUserController);


export default router;