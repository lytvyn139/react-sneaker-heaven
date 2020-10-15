import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
const router = express.Router();

/* before 
app.get("/api/products", (req, res) => {
removed path, because we gonna point to this file
   */
// (Fetch all products)PUBLIC|GET|/api/products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// (Fetch one product)PUBLIC|GET|/api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  })
);

export default router;
