import express from "express";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
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

//* filter product
router.post("/product-filters", productFiltersController);

///product count
router.get("/product-count", productCountController);

///product perpage
router.get("/product-list/:page", productListController);

///search product
router.get("/search/:keyword", searchProductController);

///similar product
router.get("/related-Product/:pid/:cid", relatedProductController);

///category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
