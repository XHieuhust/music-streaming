const User = require("../schemas/user");
const bcrypt = requre("bcryptjs");
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("Email or password is invalid");
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) throw new Error("Email or password is invalid");
  return res.status(200).json(user);
};
export const logout = async (req, res) => {};
export const signup = async (req, res) => {};
