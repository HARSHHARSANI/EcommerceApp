import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";
/////protected routes token based
export const requiredSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

////admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized action",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
