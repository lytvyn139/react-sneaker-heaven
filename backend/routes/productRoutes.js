import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

/* before 
app.get("/api/products", (req, res) => {
removed path, because we gonna point to this file

and then all moved to productRoutes
   */

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
