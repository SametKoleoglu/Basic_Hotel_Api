const {
  createRoom,
  updateRoom,
  deleteRoom,
  getDetailRoom,
  getAllRooms,
} = require("../controllers/room.js");

const { verifyAdmin } = require("../middlewares/verify.js");
const express = require("express");

const router = express.Router();

router.get("/getAllRooms", getAllRooms);
router.get("/getDetailRoom/:id", getDetailRoom);
router.post("/createRoom/:id/:hotelId", verifyAdmin, createRoom);
router.put("/updateRoom/:id", verifyAdmin, updateRoom);
router.delete("/deleteRoom/:id", verifyAdmin, deleteRoom);

module.exports = router;
