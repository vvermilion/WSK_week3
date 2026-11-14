import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findUserByUsername } from "../models/user-model.js";
import "dotenv/config";

const postLogin = async (req, res) => {
  console.log("postLogin body:", req.body);
  const { username, password } = req.body;

  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Remove password from user object before adding to token payload
  const tokenUser = {
    user_id: user.user_id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ user: tokenUser, token });
};

export { postLogin };
