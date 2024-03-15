const { register, login } = require("../controllers/auth.js");

const {verifyUser} = require("../middlewares/verify.js");

const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login",verifyUser,login);



module.exports = router;