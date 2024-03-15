const {
  updateUser,
  deleteUser,
  detailUser,
  allUser,
} = require("../controllers/user.js");

const { verifyAdmin, verifyUser } = require("../middlewares/verify.js");

const express = require("express");

const router = express.Router();

router.get("/allUser", verifyAdmin, allUser);
router.get("/detailUser/:id", verifyUser, detailUser);
router.put("/updateUser/:id", verifyAdmin, updateUser);
router.delete("/deleteUser/:id", verifyUser, deleteUser);

module.exports = router;
