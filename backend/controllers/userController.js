import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// (Auth user & get token)PUBLIC|POST|/api/users/loign
const authUser = asyncHandler(async (req, res) => {
  // comming from postman (BODY,raw,json)
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      //is email+pass=matched we generate the token
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// (Register new user )PUBLIC|POST|/api/users
const registerUser = asyncHandler(async (req, res) => {
  // comming from postman (BODY,raw,json)
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      //it will create user and authenticate right after creation
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// (Get user profile)PRIVATE|GET|/api/users/loign
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser };
