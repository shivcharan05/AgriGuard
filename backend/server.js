const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
<<<<<<< HEAD
const connectDB = require("./config/db");

dotenv.config();

=======

const connectDB = require("./config/db");

dotenv.config();
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c
connectDB();

const app = express();

<<<<<<< HEAD
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

=======
// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c
const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const vaccinationRoutes = require("./routes/vaccinationRoutes");
<<<<<<< HEAD


=======
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const outbreakRoutes = require("./routes/outbreakRoutes");

// Route usage
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/vaccination", vaccinationRoutes);
<<<<<<< HEAD

app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});

const dashboardRoutes = require("./routes/dashboardRoutes");
const outbreakRoutes = require("./routes/outbreakRoutes");

app.use("/api/dashboard",dashboardRoutes);
app.use("/api/outbreaks",outbreakRoutes);
=======
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/outbreaks", outbreakRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c
