import express from "express";
import { productController } from "../controllers/index.js";
const router = express.Router();


router.get('/', productController.getAllProducts)

router.get("/:id",productController.getProductById)

router.post("/insert", productController.insertProduct)
router.delete("/delete/:id", productController.deleteProductById);
router.patch("/", productController.updateProduct)

export default router