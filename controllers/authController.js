import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password, answer } = req.body;

    ///validation
    if (!name || !email || !password || !address || !phone || !answer) {
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
      answer,
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
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
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

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newpassword) {
      res.status(400).send({ message: "newpassword is required" });
    }

    ///check email ans answer
    const user = await userModels.findOne({ email, answer });

    ///validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    const hashed = await hashPassword(newpassword);
    await userModels.findOneAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "passwor updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, address, password, phone } = req.body;
    const user = await userModels.findById(req.user._id);
    ///password

    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModels.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Update Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Updating Profile",
      error,
    });
  }
};
