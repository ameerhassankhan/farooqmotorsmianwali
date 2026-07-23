import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import Customer from './models/Customer.js'

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

// HELPER: Token set karne ka
const setTokenCookie = (res, user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // production me true karna
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000 // 1 hour
  });
}

app.post("/api/signup", async (req, res) => {
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
});

app.post("/api/signin", async (req, res) => {
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
});

app.post("/api/customer/addcustomer", async (req, res) => {
  try {
    const {
      fullname, fathername, email, phone, address, city, customertype, notes, reference, cnic,
    } = req.body;

    if (!fullname || !cnic) {
      return res.status(400).json({ success: false, message: "Fullname and CNIC are required" });
    }

    // 2. FIX: CNIC aur Email dono check karo
    const existingCustomer = await Customer.findOne({ 
      $or: [{ cnic }, { email }] 
    });

    if (existingCustomer) {
      if (existingCustomer.cnic === cnic) {
        return res.status(400).json({ success: false, message: "CNIC already exists" });
      }
      if (existingCustomer.email === email) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
    }

    const customer = await Customer.create({
      fullname, fathername, email, phone, address, city, customertype, notes, reference, cnic,
    });

    return res.status(201).json({
      success: true,
      message: "Customer Added Successfully",
      customer,
    });

  } catch (err) {
    console.error(err);
    // 3. FIX: Mongoose duplicate key error handle
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ success: false, message: `${field.toUpperCase()} already exists` });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/customer/", async (req, res) => {
  try {
    const customer = await Customer.find();
    if(customer!=null)
    return res.status(201).json({
      success: true,
      customer,
    });

  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ success: false, message: `${field.toUpperCase()} already exists` });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
});


app.get("/api/home", isAuthenticated, (req, res) => {
    res.json({ success: true, user: req.user });
}); 

app.post("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Logout Successful" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});