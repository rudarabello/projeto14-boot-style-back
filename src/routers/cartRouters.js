import { Router } from "express";
import { AddToCart } from "../controllers/cart.controllers.js";
import { validateTokenMiddleware } from "../middlerwares/validateTokenMiddleware.js";

const router = Router();

router.post("/cart", validateTokenMiddleware, AddToCart);

export default router;