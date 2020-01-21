const router = require("express").Router();
const User = require("../model/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Validate Input Data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
