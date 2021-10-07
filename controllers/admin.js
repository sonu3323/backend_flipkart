const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res
        .status(400)
        .send({ status: "error", message: "No User Found!" });
    }

    res.status(400).send({
      status: "error",
      message: "Data fetch successfully!",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: "Somethings went wrong while fetching all users",
    });
  }
};

module.exports = { getAllUsers };
