const User = require("../schemas/user");
const bcrypt = requre("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Email or password is invalid");
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new Error("Email or password is invalid");
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({
      ...user,
      password: null,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  return res.status(200).json({ message: "Logout successfully!" });
};
const signup = async (req, res) => {
  try {
    let avatarLink = "./services/temp/" + req.file.filename;
    const uploadImgResult = await cloudinary.uploader.upload(avatarLink, {
      resource_type: "image",
    });
    fs.unlink(avatarLink, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    });
    const hashPassword = bcrypt.hashSync(req.body.password, bcrypt.genSalt(4));
    let user = new User({
      username: req.body.username,
      searchTitle: toLowerCaseNonAccentVietnamese(req.body.username),
      avatarImg: uploadImgResult.secure_url,
      email: req.body.email,
      password: hashPassword,
      following: [],
      artistFollowed: [],
      playlists: [],
      albumsFollowed: [],
      preferedGenre: [],
    });
    user.save(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "User created successfully", user });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, logout, signup };
