import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    ///validation
    if (!name || !email || !password || !address || !phone) {
      return res.send({ message: "All fields are required" });
    }

    ///checking existing user in db
    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please Login",
      });
    }

    ///register User
    const hashedPassword = await hashPassword(password);

    ///save
    const user = await new userModels({
      name,
      phone,
      address,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Saved Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

///POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    ///validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email or Password is incorrect",
      });
    }

    ///check user

    const user = await userModels.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    ///token creation

    const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login Successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Unsuccessfull",
      error,
    });
  }
};

// export default { registerController };

///test controller

export const testController = (req, res) => {
  //   console.log("protected route");
  res.send("protected route");
};
