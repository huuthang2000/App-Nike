import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { userController } from "../controllers/index.js";

router.get("/", (req, res) => {
  res.send("get user");
});

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  userController.login
);

router.post("/register", userController.register);

export default router;
