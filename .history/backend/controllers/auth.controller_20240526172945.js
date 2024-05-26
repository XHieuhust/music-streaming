const User = require("../schemas/user");

export const login = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (req, res) => {};
export const signup = async (req, res) => {};
