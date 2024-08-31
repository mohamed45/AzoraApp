const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const HttpError = require("../models/http-error");
const Users = require("../models/users");

const signup = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error);
    return next(
      new HttpError(
        "You passed invalid signup data, plaese check your data",
        400
      )
    );
  }
  const { email, password } = req.body;
  let hasUser;
  try {
    hasUser = await Users.findOne({ email });
  } catch (err) {
    const error = new HttpError("Plase Enter Faild data", 500);
    return next(error);
  }

  if (hasUser) {
    return next(
      new HttpError("Could not create a user is already exesit.", 422)
    );
  }

  const createUser = new Users({
    email,
    password,
  });
  try {
    await createUser.save();
  } catch (err) {
    const error = new HttpError("i Can not save this signup data to DB", 500);
    return next(error);
  }
  res.status(201).json({ newUser: createUser.toObject({ getUsers: true }) });
};
const login = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error);
    return next(new HttpError('You passed invalid login data, please check your data', 400));
  }

  const { email, password } = req.body;
  let loginUser;

  try {
    loginUser = await Users.findOne({ email });
  } catch (err) {
    const error = new HttpError("Please Enter Valid data", 500);
    return next(error);
  }

  if (!loginUser) {
    return next(new HttpError("Could not identify user, credentials seem to be wrong.", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, loginUser.password);  // Compare hashed passwords
  } catch (err) {
    const error = new HttpError("Could not log you in, please check your credentials and try again.", 500);
    return next(error);
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials, please try again.", 401));
  }

  const token = jwt.sign(
    { userId: loginUser.id, email: loginUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ userId: loginUser.id, email: loginUser.email, token });
};

exports.signup = signup;
exports.login = login;
