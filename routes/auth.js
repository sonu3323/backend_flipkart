const express = require("express");
const { signup, signin, signOut, userUpdate } = require("../controllers/user");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/userupdate", auth, userUpdate);
router.get("/signout", auth, signOut);

module.exports = router;
