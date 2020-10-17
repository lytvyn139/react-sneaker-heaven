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
export { authUser, getUserProfile };
