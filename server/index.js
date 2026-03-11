const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const houseRoutes = require("./routes/houseRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/house", houseRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});