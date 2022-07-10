import { Router } from "express";
import { AddToCart, GetCartItems } from "../controllers/cart.controllers.js";
import { validateTokenMiddleware } from "../middlerwares/validateTokenMiddleware.js";

const router = Router();

router.post("/cart", validateTokenMiddleware, AddToCart);
router.get("/cart", validateTokenMiddleware, GetCartItems);

export default router;