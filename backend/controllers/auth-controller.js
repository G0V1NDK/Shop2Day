const jwt = require("jsonwebtoken");

const User = require("../models/user-model");
const validation = require("../util/validation");

require("dotenv").config();

async function signup(req, res, next) {
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.role,
      req.body.phone
    )
  ) {
    const error = new Error("Invalid inputs passed, please check your data.");
    error.code = 422;

    return next(error);
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.role,
    req.body.phone
  );

  let createdUserId;

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      const error = new Error("User exists already, please login instead.");
      error.code = 422;

      return next(error);
    }

    const createdUser = await user.signup();
    createdUserId = createdUser.insertedId.toString();
  } catch (error) {
    error.message = "Signing up failed, please try again later.";
    error.code = 500;

    return next(error);
  }

  const createdUser = await User.findById(createdUserId);

  let token;
  try {
    token = jwt.sign({ user: createdUser }, process.env.JWT_TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });
  } catch (error) {
    error.message = "Signing up failed, please try again later.";
    error.code = 500;

    return next(error);
  }

  res.status(201).json({ user: createdUser, token: token });
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    error.message = "Logging in failed, please try again later.";
    error.code = 500;

    return next(error);
  }

  if (!existingUser) {
    const error = new Error("Invalid credentials - please double-check your email and password!");
    error.code = 403;

    return next(error);
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    const error = new Error("Invalid credentials, could not log you in.");
    error.code = 403;
    
    return next(error);
  }

  const authenticatedUser = await User.findById(existingUser._id);

  let token;
  try {
    token = jwt.sign(
      { user: authenticatedUser },
      process.env.JWT_TOKEN_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    error.message = "Logging in failed, please try again later.";
    error.code = 500;

    return next(error);
  }

  res.status(200).json({ user: authenticatedUser, token: token });
}

module.exports = {
  signup: signup,
  login: login,
};
