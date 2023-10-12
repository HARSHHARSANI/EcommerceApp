import express from "express";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/ProductController.js";
import formidable from "express-formidable";
const router = express.Router();

///routes
router.post(
  "/create-product",
  requiredSignIn,
  isAdmin,
  formidable(),
  createProductController
);

///get all products
router.get("/get-Products", getAllProductController);

///get single product
router.get("/get-Products/:slug", getSingleProductController);

///get photo
router.get("/product-photo/:pid", productPhotoController);

///delete product
router.delete(
  "/delete-product/:id",
  requiredSignIn,
  isAdmin,
  deleteProductController
);

///update product
router.put(
  "/update-product/:pid",
  requiredSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
