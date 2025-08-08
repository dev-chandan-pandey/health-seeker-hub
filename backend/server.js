// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Doctor = require("./models/Doctor");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// GET doctors listing
app.get("/api/doctors", async (req, res) => {
  try {
    const { location, specialization, gender, minExperience, sortBy, page = 1, limit = 10 } = req.query;

    if (!location || !specialization) {
      return res.status(400).json({ message: "Location and specialization are required" });
    }

    let filter = { 
      location: new RegExp(location, "i"), 
      specialization: new RegExp(specialization, "i") 
    };

    if (gender) filter.gender = gender;
    if (minExperience) filter.experience = { $gte: Number(minExperience) };

    let sort = {};
    if (sortBy === "experience") sort.experience = -1;
    else if (sortBy === "rating") sort.rating = -1;

    const doctors = await Doctor.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET doctor details
app.get("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
