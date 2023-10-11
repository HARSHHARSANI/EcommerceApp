import express from "express";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/CategoryController.js";
export const router = express.Router();

///create category routes
router.post(
  "/create-category",
  requiredSignIn,
  isAdmin,
  createCategoryController
);

///update category
router.put(
  "/update-category/:id",
  requiredSignIn,
  isAdmin,
  updateCategoryController
);

///getAll route
router.get("/get-category", categoryController);

///get single category
router.get("/single-category/:slug", singleCategoryController);

///delete Route
router.delete(
  "/delete-category/:id",
  requiredSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
