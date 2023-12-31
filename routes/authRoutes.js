import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

///router objects

const router = express.Router();
///routing
///Register || method POST
router.post("/register", registerController);

router.post("/login", loginController);

///test Routing
router.get("/test", requiredSignIn, isAdmin, testController);

///Forgot Password||post
router.post("/forgot-password", forgotPasswordController);

///protected route auth
router.get("/user-auth", requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

///protected admin route auth
router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

///update-profile
router.put("/profile", requiredSignIn, updateProfileController);

///orders
router.get("/orders", requiredSignIn, getOrdersController);

///All orders
router.get("/all-orders", requiredSignIn, isAdmin, getAllOrdersController);

///order-status-update
router.put(
  "/order-status/:orderId",
  requiredSignIn,
  isAdmin,
  orderStatusController
);

export default router;
