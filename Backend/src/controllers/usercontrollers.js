import UserValue from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    const existingUser = await UserValue.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserValue({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserValue.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or phone number" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });
        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error("Error in logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await UserValue.find();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}