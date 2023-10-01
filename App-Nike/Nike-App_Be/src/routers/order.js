import express from "express";
import { orderController } from "../controllers/index.js";
const router = express.Router();


router.get('/', orderController.getAllOrders)


router.post("/insert", orderController.insertOrder)
router.delete("/delete/:id", orderController.deleteOrderById);
router.patch("/", orderController.updateOrder)

export default router