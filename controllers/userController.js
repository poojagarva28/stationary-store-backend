const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { find } = require("../models/userModel");

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered");
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword, "hashed password");

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  console.log(user, "user created");
  if (user) {
    res.status(201).json({ _id: user._id, email: user._email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const findUser = await User.findOne({ email });
  // compare with user password store in db
  const comparePassword = await bcrypt.compare(password, findUser.password);
  console.log(comparePassword, "comparePassword");
  if (findUser && comparePassword) {
    const accessToken = jwt.sign(
      {
        user: {
          username: findUser.username,
          email: findUser.email,
          id: findUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120m" }
    );
    console.log("after condition");

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password not valid");
  }
});

//@desc get user
//@route GET /api/users/current
//@access private
const getUser = asyncHandler(async (req, res) => {
  console.log("abcd");
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getUser };
