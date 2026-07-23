import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { addCustomer, deleteCustomer, fetchCustomers, getCustomerById, updateCustomer } from "./controllers/customerController.js";
import { logOut, signIn, signUp } from "./controllers/authController.js";

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

app.post("/api/signup", signUp)
app.post("/api/signin", signIn)
app.post("/api/logout", logOut);

app.post("/api/customers/addcustomer",addCustomer)
app.get("/api/customers/", fetchCustomers)
app.delete("/api/customers/delete/:id", deleteCustomer)
app.put("/api/customers/edit/:id", updateCustomer);
app.get("/api/customers/view/:id", getCustomerById);

app.get("/api/home", isAuthenticated, (req, res) => {
    res.json({ success: true, user: req.user });
}); 



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});