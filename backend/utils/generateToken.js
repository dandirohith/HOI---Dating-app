const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); // expires in one hour
  console.log(token);
  res.cookie("jwt", token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true, //prevent xss attacks
    sameSite: "strict", //prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateTokenAndSetCookie;
