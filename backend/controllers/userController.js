const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password, password2, age, gender } = req.body;

    const splitemail = email.split("@");
    const getdata = email.match(/(.+)(.{2})u(.{3})(.{3})@(.+)$/);
    const name = getdata[1],
      batch = "20" + getdata[2].toString(),
      major = getdata[3];

    if (password !== password2) {
      res.status(400).json({ error: "Passwords don't match" });
      //throw new Error("Passwords don't match");
    } else if (getdata[5] != "mahindrauniversity.edu.in") {
      res.status(400).json({
        error: "Invalid email. Please use a valid Uni email address.",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      batch,
      major,
      email,
      password: hashedPassword,
      age,
      gender,
    });

    if (user) {
      //generate JWT token
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        batch: user.batch,
        major: user.major,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log("Error in registerUser", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (user && isCorrectPassword) {
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        batch: user.batch,
        major: user.major,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log("Error in loginUser", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    logout a user
// @route   POST /api/users/logout
// @access  Public (not async)
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("Error in logoutUser", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
