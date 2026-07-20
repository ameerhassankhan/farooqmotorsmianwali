import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
// import { Navigate } from 'react-router-dom';
  

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
  const { username, email, password } = req.body;
  User.create({
    username,
    email,
    password
  })
  .then((user) => {
    console.log("User created:", user);
    res.status(201).json({ success:true, message: "Signup successful",  redirectTo: "/home" });
  })
  .catch((error) => {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Signup failed" });
  });
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
      res.json({ success: true, message: "Signin successful", redirectTo: "/home" });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ message: "Signin failed" });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});