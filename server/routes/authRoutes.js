const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();

    res.json("User registered");

  } catch (err) {
    res.json(err);
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) return res.json("User not found");

    const valid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!valid) return res.json("Wrong password");


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.json({
      message: "Login success",
      token,
    });

  } catch (err) {
    res.json(err);
  }
});

module.exports = router;