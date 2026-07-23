import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const setTokenCookie = (res, user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // production me true karna
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000 // 1 hour
  });
}
 
export const signUp = async (req, res) => {
    try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. FIX: await lagaya
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered, try another." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    setTokenCookie(res, user);
    res.status(201).json({ success: true, message: "Signup successful", redirectTo: "/home" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};
export const logOut = async (req, res) => {
 res.clearCookie("token");
    res.json({ success: true, message: "Logout Successful" });
};

export const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      setTokenCookie(res, user);
      res.json({ success: true, message: "Signin successful", redirectTo: "/home" });
  
    } catch (error) {
      console.error("Signin Error:", error);
      res.status(500).json({ message: "Signin failed" });
    }
};