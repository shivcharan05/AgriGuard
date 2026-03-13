const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const vaccinationRoutes = require("./routes/vaccinationRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/vaccination", vaccinationRoutes);

app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});