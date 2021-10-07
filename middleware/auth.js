const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const headerToken = req.header("Authorization");
    const token = headerToken && headerToken.replace("Bearer ", "");

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User is not Found");
    }

    req.UserToken = token;
    req.userProfile = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "error", message: "authenticaiton failed" });
  }
};

const isAdmin = (req, res, next) => {
  console.log("Is admin route", req.userProfile);
  const user = req.userProfile;

  if (user.role == 0) {
    return res.status(404).send({
      status: "error",
      message:
        "Access Denied ! You are not Authorized OR You are not an ADMIN !!!",
    });
  }

  if (user.role == 1) {
    next();
  }
};

module.exports = { auth, isAdmin };
