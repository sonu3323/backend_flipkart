const express = require("express");
const { getAllUsers } = require("../controllers/admin");
const { isAdmin, auth } = require("../middleware/auth");

const router = express.Router();

router.get("/allusers", auth, isAdmin, getAllUsers);

module.exports = router;
