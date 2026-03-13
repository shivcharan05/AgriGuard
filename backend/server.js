const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const vaccinationRoutes = require("./routes/vaccinationRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Route usage
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/vaccination", vaccinationRoutes);
app.use("/api/ai", aiRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});