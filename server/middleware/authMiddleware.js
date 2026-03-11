const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const token = req.headers.token;

    if (!token) {
      return res.json("No token");
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = verified.id;

    next();

  } catch (err) {

    res.json("Invalid token");

  }

};

module.exports = authMiddleware;