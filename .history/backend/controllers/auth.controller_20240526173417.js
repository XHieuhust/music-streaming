const User = require("../schemas/user");
const bcrypt = requre("bcryptjs")
export const login = async (req, res) => {
  try {
    const {email, password}= req.body
    const user = await User.findOne({email: email});
    if (!user) throw new Error("Email or password is invalid")
    const isValidPassword = await 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (req, res) => {};
export const signup = async (req, res) => {};
