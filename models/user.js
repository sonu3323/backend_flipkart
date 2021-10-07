const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      mixLength: 15,
    },
    lastName: {
      type: String,
      trim: true,
      mixLength: 20,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: (value) => {
        if (!validator.isEmail(value)) throw new error("Email is not validate");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: (value) => {
        if (value.toLowerCase().includes("password"))
          throw new error("Password is contain 'Password'");
      },
    },

    userInfo: {
      type: String,
      mixLength: 100,
    },

    role: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: Number,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],

    purchases: {
      type: Array,
      defualt: [],
    },
  },
  { versionKey: false, timestamps: true }
);

// REMOVE PASSWORD , TOKEN OBJECT, TIMESTAMPES ***
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  console.log(userObject);

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  // ADD LOGIN TIME OF USER ***
  userObject.loginTime = new Date().toLocaleString();

  console.log(userObject);

  return userObject;
};

//   USER PASSWORD CONVERT INTO HASH BEFORE SAVE *****
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// USER TOKEN GENERATE AND SAVE ***
userSchema.methods.getTokenGenerate = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

// FIND CredentialS ****

userSchema.statics.findByCredentails = async function (email, password) {
  console.log(email, password);

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
