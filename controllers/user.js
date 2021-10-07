const User = require("../models/user");

// Name: Sonu Sharma
// Profile: Full_Stack Developer
// Method: User Sign UP

const signup = async (req, res) => {
  const Db_fields = [
    "firstName",
    "lastName",
    "email",
    "password",
    "phoneNumber",
  ];

  console.log(Object.keys(req.body));

  const [firstName, lastName, email, password, phoneNumber] = Object.keys(
    req.body
  );

  const reqFields = [firstName, lastName, email, password, phoneNumber];

  console.log(reqFields);

  const is_match_fields = Db_fields.every((field) => reqFields.includes(field));

  if (!is_match_fields) {
    return res
      .status(400)
      .send({ status: "error", message: "Input Fields name are wrong!" });
  }

  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.getTokenGenerate();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({
      status: error,
      message: "Someting went wrong while saving user in Database",
      error: error,
    });
  }
};

// Name: Sonu Sharma
// Profile: Full_Stack Developer
// Method: User Sign In

const signin = async (req, res) => {
  const Db_fields = ["email", "password"];

  const req_body = Object.keys(req.body);
  const is_match_fields = req_body.every((field) => Db_fields.includes(field));

  console.log(req.body);
  if (!is_match_fields) {
    return res.status(400).send({
      status: "false",
      message: "Input fields name was wrong ",
      error: "error",
    });
  }

  try {
    const user = await User.findByCredentails(
      req.body.email,
      req.body.password
    );

    console.log(user);

    const token = await user.getTokenGenerate();

    res.status(200).send({ status: "true", data: user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: error,
      message: "Someting went wrong while Login",
      error: error,
    });
  }
};

// Name: Sonu Sharma
// Profile: Full_Stack Developer
// Method: User Profile Update

const userUpdate = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userProfile._id, req.body, {
      new: true,
    });

    await user.save();

    res
      .status(200)
      .send({ error: "success", messsage: "User update successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      eror: "error",
      message: "Someting went wrong while updateing the user data",
    });
  }
};

// Name: Sonu Sharma
// Profile: Full_Stack Developer
// Method: User Sign Out

const signOut = async (req, res) => {
  console.log("User Profile", req.userProfile);

  try {
    req.userProfile.tokens = req.userProfile.tokens.filter((token) => {
      return token.token !== req.UserToken;
    });
    await req.userProfile.save();

    res.send({
      status: "true",
      message: `${req.userProfile.firstName} sign out successfully`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      message: `Something went wrong in signout`,
    });
  }
};

module.exports = { signup, signin, signOut, userUpdate };
