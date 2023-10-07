import { hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";

const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    ///validation
    if (!name || !email || !password || !address || !phone) {
      return res.status(400).send({ error: "All fields are required" });
    }

    ///checking existing user in db
    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Registered please Login",
      });
    }

    ///registerUser
    const hashedPassword = await hashPassword(password);

    ///save
    const user = new userModels({
      name,
      phone,
      address,
      email,
      password: hashedPassword,
    });

    await user.save();

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
      error: error.message,
    });
  }
};

export default registerController;
