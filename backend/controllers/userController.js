import validator from "validator";
import bycrpt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password);
    if (!email || !name || !password) {
      res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Please Enter valid email" });
    }

    if (password.length < 8) {
      res.json({ success: false, message: "Please Enter strong password" });
    }

    // hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const userData = {
      email,
      name,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, message: "User Registration Successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Details Missing" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does't exits" });
    }

    const isMatch = await bycrpt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, message: "Login Successful" });
    } else {
      res.json({ success: false, message: "Invalid Credentials"});
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const {userId} = req.res;

    const userData = await userModel.findOne({userId}).select('-password');

    res.json({success : true, userData});

  } catch (error) {
    console.log(error);
    res.json({success: true, message : error.message});
  }
}

export { registerUser, loginUser,getUserData };
