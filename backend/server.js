// 1️⃣ Import packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");

dotenv.config();

// 2️⃣ Initialize app
const app = express();

// 3️⃣ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

// 4️⃣ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ================================
// 🐄 Animal Data
// ================================
let animals = [
  { _id: "1", name: "Cow1", type: "Cow", breed: "Holstein", count: 1 },
  { _id: "2", name: "Goat1", type: "Goat", breed: "Boer", count: 1 }
];

// Get all animals
app.get("/api/animals", (req, res) => res.json(animals));

// Add animal
app.post("/api/animals", (req, res) => {
  const { name, type, breed } = req.body;
  const newAnimal = {
    _id: Date.now().toString(),
    name,
    type,
    breed,
    count: 1
  };
  animals.push(newAnimal);
  res.json({ message: "Animal added", animal: newAnimal });
});

// Delete animal
app.delete("/api/animals/:id", (req, res) => {
  animals = animals.filter(a => a._id !== req.params.id);
  res.json({ message: "Animal deleted" });
});

// ================================
// 💉 Vaccination Data
// ================================
let vaccinations = [
  { _id: "1", animalId: "1", animalType: "Cow", vaccine: "FMD", date: "2026-03-01" }
];

// Get all vaccinations
app.get("/api/vaccinations", (req, res) => res.json(vaccinations));

// Add vaccination
app.post("/api/vaccinations", (req, res) => {
  const { animalId, animalType, vaccine, date } = req.body;
  const newVaccine = { _id: Date.now().toString(), animalId, animalType, vaccine, date };
  vaccinations.push(newVaccine);
  res.json({ message: "Vaccination added", vaccination: newVaccine });
});

// Delete vaccination
app.delete("/api/vaccinations/:id", (req, res) => {
  vaccinations = vaccinations.filter(v => v._id !== req.params.id);
  res.json({ message: "Vaccination deleted" });
});

// ================================
// 🧠 AI Disease Prediction (optional)
app.post("/predict", upload.single("image"), (req, res) => {
  const diseases = ["Healthy", "Foot and Mouth Disease", "Skin Infection", "Eye Infection", "Parasitic Infection"];
  const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
  res.json({ success: true, disease: randomDisease, confidence: (70 + Math.random() * 30).toFixed(2) + "%" });
});

// ================================
// 📊 Dashboard data
app.get("/api/dashboard", (req, res) => {
  const animalCountMap = {};
  animals.forEach(a => {
    const t = a.type.trim();
    animalCountMap[t] = (animalCountMap[t] || 0) + 1;
  });

  const totalAnimals = animals.length;
  const vaccinated = vaccinations.length;
  const notVaccinated = totalAnimals - vaccinated >= 0 ? totalAnimals - vaccinated : 0;
  const diseaseCases = Math.floor(Math.random() * 5);

  res.json({
    animals: animals,
    diseaseCases,
    vaccination: { vaccinated, notVaccinated },
    alert: diseaseCases > 0
  });
});

// ================================
// Test route
app.get("/", (req, res) => res.send("Backend Server Running 🚀"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));