import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRouter from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is up....");
});

/* thats why path was removed in productRouter */
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;

console.log(
  `=============================================================`.red.bold
);
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on: http://localhost:${PORT}/`
      .green.bold
  )
);
