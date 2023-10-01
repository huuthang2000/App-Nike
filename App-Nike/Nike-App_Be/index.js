import express from "express";
import * as dotenv from "dotenv";
import { cartRouter, orderRouter, productRouter, userRouter } from "./src/routers/index.js";
import connect from "./src/database/database.js";

const app = express();
dotenv.config();

app.use(checkToken);
app.use(express.json());

const PORT = process.env.PORT ?? 2000;

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

app.listen(PORT, async () => {
  await connect();
  console.log("Server is listening on port: ", PORT);
});
