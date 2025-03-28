import express from "express";
import { registerController, loginController, logoutController, currentUserController } from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { validateUser } from "../middlewares/validateUsers.js";

const router = express.Router();

router.post('/register',validateUser, registerController);
router.post('/login',loginController);
router.post('/logout',isAuthenticated, logoutController);
router.post('/',isAuthenticated, currentUserController);


export default router;