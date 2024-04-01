const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./Routers/userRouter");

//Middleware
app.use(cors());
app.use(express.json());

//port
const port = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected....");
  } catch (error) {
    console.log("MongoDB NOT Connected....", error.message);
  }
};

connectDB();

//For knowing that server is working or not
app.get("/", (req, res) => {
  res.send("GeekChat is Running....");
});

app.use("/user", userRoutes);

//For knowing which port we are use
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
