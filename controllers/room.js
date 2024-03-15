const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const room = await Room.create(req.body);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: room._id },
      });
    } catch (err) {
      console.log(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    console.log({ message: err.message });
  }
};
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, //Update işlemi olduğu için $set kodu kullanıldı !!!
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    console.log({ message: err.message });
  }
};

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);

    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params._id },
    });

    res.status(200).json("Room has been deleted.");
  } catch (err) {
    console.log({ message: err.message });
  }
};

const getDetailRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    res.status(200).json(room);
  } catch (err) {
    console.log({ message: err.message });
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (err) {
    console.log({ message: err.message });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getDetailRoom,
  getAllRooms,
};
