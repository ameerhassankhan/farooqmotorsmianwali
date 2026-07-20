import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/db.js";
  

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

connectDB();
app.post("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});