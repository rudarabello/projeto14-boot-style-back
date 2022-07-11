import { Router } from "express";
import { addProduct, removeProduct, returnProduct, returnProducts, returnAllProducts } from "../controllers/product.controllers.js";

const router = Router();

router.post("/products", addProduct);
router.delete("/products", removeProduct);
router.get("/products/id", returnProduct);
router.get("/products", returnProducts);
router.get("/allproducts", returnAllProducts);

export default router;