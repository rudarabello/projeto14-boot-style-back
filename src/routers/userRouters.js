import { Router } from "express";
import { login, signup, logout } from "../controllers/auth.controllers.js";
import checkAuth from "../middlerwares/checkAuthMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", checkAuth, logout);


export default router;