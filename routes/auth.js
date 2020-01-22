const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Registration Route
router.post("/register", async (req, res) => {
  //Validate Input Data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Check if user alredy present
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email Already Exists");
  }

  //Hash The Password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  //Create New User
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass
  });

  try {
    const savedUser = await newUser.save();
    res.send({ newUser: newUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login Route
router.post("/login", async (req, res) => {
  //Validate Input Data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Check if user not registered
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email Does Not Exist");
  }

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Password");
  }

  //Create and assign a token
  const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token });
});

module.exports = router;
