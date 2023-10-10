import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
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

export default router;
