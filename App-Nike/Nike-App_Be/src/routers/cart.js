import express from "express";
import { cartController } from "../controllers/index.js";
const router = express.Router();


router.get('/', cartController.getAllCarts)


router.post("/insert", cartController.insertCart)
router.delete("/delete/:id", cartController.deleteCartById);
router.patch("/", cartController.updateCart)

export default router