const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const user = await User.findOne({email});
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    //Password hashleme
    //Hashleme işlemi !
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    if (!isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    const newUser = await User.create({
      ...req.body,
      password: hashedPass,
    });

    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({ token, newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function isEmail(email) {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    //Parola Kontrol
    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  register,
  login,
}