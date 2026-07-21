import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
  

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
 
connectDB();
app.post("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Backend Connected Successfully",
  });
  console.log("Backend Connected Successfully");
}); 

app.post("/api/signup", (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log("Signup request received:", { firstname, lastname, email });
  if (User.findOne({ email: email })) {
    return res.status(400).json({ message: "Email is already registered, try another." });
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).json({ message: "Signup failed" });
    }
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Signup failed" });
      }
      User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
      }).then((user) => {
    console.log("User created:", user);
    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.cookie('token', token);
    res.status(201).json({ success:true, message: "Signup successful",  redirectTo: "/home" });
  })
  .catch((error) => {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Signup failed" });
  });
});});
});

app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Here you would typically compare the provided password with the hashed password
      // For now, we'll assume the password is correct
      const comparePassword = bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Signin failed" });
        }
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token);
        res.json({ success: true, message: "Signin successful", redirectTo: "/home" });
   
      });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ message: "Signin failed" });
    });
});

app.get("/api/home", isAuthenticated, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
}); 

app.post("/api/logout", (req, res) => {

    res.clearCookie("token");

    res.json({
        success: true,
        message: "Logout Successful",
    });

});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});