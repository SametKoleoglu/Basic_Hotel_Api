const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createHotel = async (req, res, next) => {
  const newHotel = await Hotel(req.body);
  res.status(201).json(newHotel);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const typeByCount = async (req, res, next) => {
  try {
    const hotel = await Hotel.countDocuments({ type: "hotel" });
    const villa = await Hotel.countDocuments({ type: "villa" });

    res.status(200).json([
      { type: "hotel", count: hotel },
      { type: "villa", count: villa },
    ]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const typeByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");

    const hotel = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  getAllHotel,
  typeByCount,
  typeByCity,
};
