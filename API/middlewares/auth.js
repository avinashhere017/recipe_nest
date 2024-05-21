
import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken';

export const Authenticate = async (req, res, next) => {
  const token = req.header("Auth");
  try {
    if (!token) return res.status(401).json({ message: "Login first" });

    const decode = jwt.verify(token, process.env.JWT_SECRET || "!@#$%^&*()");
    const id = decode.userId;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not exist" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
